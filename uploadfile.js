/**
 * Created by Postbird on 2017/2/22.
 */
var express=require('express');
var fs=require('fs');
var bodyParser=require('body-parser');
var multer=require('multer');
var path=require('path');
var url=require('url');
var http=require('http');

//创建爱app
var app=express();
app.use(bodyParser.urlencoded({extended:false}));

//设置文件上传的public/upload路径
var uploadDir='./public/upload/';
//规定只上传一张图片 使用single
var upload=multer({dest:uploadDir}).single('image');

app.get('/',function (req,res){
    res.sendFile(__dirname+'/'+'uploadFile.html');
});

app.post('/file_upload',function(req,res,next){
    //文件上传
    upload(req, res, function(err){
        if(err){
            console.error(err.message);
        }else{
            //获取文件的名称，然后拼接成将来要存储的文件路径
            var des_file=uploadDir+req.file.originalname;
            //读取临时文件
            fs.readFile(req.file.path,function(err,data){
                //将data写入文件中，写一个新的文件
                fs.writeFile(des_file,data,function(err){
                    if(err){
                        console.error(err.message);
                    }else{
                        var reponse={
                            message:'File uploaded successfully',
                            filename:req.file.originalname
                        };
                        //删除临时文件
                        fs.unlink(req.file.path,function(err){
                            if(err){
                                console.error(err.message);
                            }else{
                                console.log('delete '+req.file.path+' successfully!');
                            }
                        });
                    }
                    res.end(JSON.stringify(reponse));
                });

            });
        }
    });

});

var server=app.listen(45999,function(){
    var host=server.address().address;
    var port=server.address().port;

    console.log('Server at http://%s:%s',host,port);
});


