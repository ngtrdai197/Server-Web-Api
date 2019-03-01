const Area = require('../models/Area.model');
const Post = require('../models/Post.model');

exports.searchAll = (req, res) => {
    if (req.params.postname) {
        // const regex = new RegExp(to_slug(req.params.postname), 'gi');

        // console.log(to_slug(req.params.postname));

        Post.find().then(result => {
                // console.log(result);
            if (result) {
                console.log(result);
                const post = []
                result.forEach(e => {
                    if(to_slug(e.PostName).includes(to_slug(req.params.postname))){
                    //     post.push(e);
                    }
                    console.log(to_slug(e.PostName));
                    
                });
                console.log(post);
                
                // return res.status(200).send({ status: true, data: result });
            }
        }).catch(err => {
            return res.status(500).send({ message: err.message });
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
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}