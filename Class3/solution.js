import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Enter the url/text for qr-image:",
            name: "URL",
        },
        {
            message:"Enter File Name:",
            name:"fileName"
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        // console.log(answers)
        const {URL,fileName} = answers;
        var qr_png = qr.image(URL, { type: 'png' });
        qr_png.pipe(fs.createWriteStream(`${fileName}_url.png`));

        fs.appendFile("totalUrls.txt",URL,(err)=>{
            if(err) throw err;
        })

        // fs.appendFile("./Qr_images",()=>{
        //     var qr_png = qr.image(URL, { type: 'png' });
        //     qr_png.pipe(fs.createWriteStream(`${fileName}_url.png`))
        // },(err)=>{
        //     if(err) throw err;
        // })

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });