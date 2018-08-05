import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateHeroCommand {

    constructor(name: string) {

        this.name = name;
    }

    @IsString()
    @MinLength(3)
    @ApiModelProperty({ required: true, type: String })
    public readonly name: string;
}
