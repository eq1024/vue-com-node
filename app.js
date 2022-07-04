const express = require('express')
const path = require('path')
const multiparty = require('multiparty');
const app = express()
var cors = require('cors');
app.use(cors())

app.use(express.static(__dirname + '/static'))

app.post('/upload', function (req, res) {
    var form = new multiparty.Form();
    var msg = { info: '', img: {} };
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + "/upload";
    //设置单文件大小限制
    // form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log("错误===",err);
            msg.info = '上传失败';
            res.send(msg);
            return;
        }
        for( let k in files){
            msg.img[k]=files[k][0]
        }
        msg.info = '上传成功'
        res.send(msg);
    });
});
app.listen(2714, () => {
    console.log("http://localhost:2714");
})

