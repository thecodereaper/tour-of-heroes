import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

        const { metatype }: ArgumentMetadata = metadata;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object: any[] = plainToClass(metatype, value);
        const errors: ValidationError[] = await validate(object);

        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${errors.toString()}`, HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    private toValidate(metatype: any): boolean {

        const types: any[] = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}
