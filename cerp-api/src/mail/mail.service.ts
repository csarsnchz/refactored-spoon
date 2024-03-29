import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(name:string,mail:string,idUser:string) {
    const url = `${process.env.PATH_URL}?token=${idUser}`;

    await this.mailerService.sendMail({
      to: mail,
      subject: 'Bienvenido a CERP! Confirma tu Email',
      attachments: [{
        filename: 'cerplogo.png',
          path: __dirname +'/templates/assets/cerplogo.png',
         cid: 'imagename'
        }],
      template: './confirmation',
      context: {
        name: mail,
        url,
      },
    });
  }
}
