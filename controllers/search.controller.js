const Area = require('../models/Area.model');
const Post = require('../models/Post.model');
const CategoryChild = require('../models/CategoryChild.model');

exports.searchAll = (req, res) => {
    if (req.params.postname) {
        console.log(req.params.postname);
        
        Post.find().then(result => {
            if (result) {
                const posts = []
                result.forEach(e => {
                    if (to_slug(e.PostName).includes(to_slug(req.params.postname))) {
                        posts.push(e);
                    }
                });
                if (posts.length > 0) {
                    return res.status(200).send({ status: true, data: posts });
                } else {
                    return res.status(200).send({ status: false });

                }
            }
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        })
    }

}


exports.searchParams = (req, res) => {
    const area = req.query.area;
    const categoryParent = req.query.categoryParent;
    const categoryChild = req.query.categoryChild;
    // && categoryParent.length > 0
    if (area && categoryParent && categoryChild) {
        Post.find({ AreaId: area, CategoryChildId: categoryChild }).exec((err, result) => {
            return res.status(200).send({ data: result });
        })
    } else if (area && !categoryParent && !categoryChild) {
        Post.find({ AreaId: area }).exec((err, result) => {
            return res.status(200).send({ data: result });
        })
    }
    else if (area && categoryParent && !categoryChild) {
        // tìm ID CateParent trong CateChild trùng với ID CateParent trùng với query từ client gửi lên
        // lấy được danh sách những CateChild ID thuộc CateParentID nằm ở trong bài post
        let postsTemp = [];
        let posts = [];
        CategoryChild.find({ CategoryParent: categoryParent }).populate({ path: 'Posts' }).select('Posts').exec().then(data => {
            if (data) {
                data.map(x => {
                    if (x.Posts.length > 0) {
                        for (let i = 0; i < x.Posts.length; i++) {
                            postsTemp.push(x.Posts[i]);
                        }
                    }
                })
            }
            for (let i = 0; i < postsTemp.length; i++) {
                if (postsTemp[i].AreaId == area) {
                    posts.push(postsTemp[i]);
                }
            }
            return res.status(200).send({ status: true, data: posts });
        })
    }

}

function to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '');


    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}