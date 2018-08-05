import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangeHeroNameCommand {

    constructor(id: string, name: string) {

        this.id = id;
        this.name = name;
    }

    @IsString()
    @ApiModelProperty({ required: true, type: String })
    public readonly id: string;

    @IsString()
    @MinLength(3)
    @ApiModelProperty({ required: true, type: String })
    public readonly name: string;
}
