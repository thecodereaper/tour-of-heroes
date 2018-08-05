import { ValidationPipe } from '@framework/pipes';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerBaseConfig, SwaggerDocument } from '@nestjs/swagger/dist/interfaces';
import { json } from 'body-parser';

import { AppConfig } from '../config';
import { AppModule } from './app.module';

export class App {

    public async run(): Promise<AppConfig> {

        const application: INestApplication = await NestFactory.create(AppModule);
        const appConfig: AppConfig = application.get<AppConfig>(AppConfig.name);

        application.enableCors();
        application.use(json());
        application.useGlobalPipes(new ValidationPipe());
        application.setGlobalPrefix(appConfig.apiRoutePrefix);

        this.createApiDocument(application, appConfig);
        await application.listen(appConfig.port);

        return appConfig;
    }

    private createApiDocument(application: INestApplication, appConfig: AppConfig): void {

        const swaggerConfig: SwaggerBaseConfig = new DocumentBuilder()
            .setTitle(appConfig.apiTitle)
            .setDescription(appConfig.apiDescription)
            .setVersion(appConfig.apiVersion)
            .setBasePath(appConfig.apiRoutePrefix)
            .addBearerAuth()
            .build();

        const swaggerDocument: SwaggerDocument = SwaggerModule.createDocument(application, swaggerConfig);
        const swaggerPath: string = `/${appConfig.apiDocumentPath}`;

        SwaggerModule.setup(swaggerPath, application, swaggerDocument);
    }
}
