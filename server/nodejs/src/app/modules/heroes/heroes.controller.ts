import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { HeroesService } from './heroes.service';
import { ChangeHeroNameCommand, CreateHeroCommand, Hero } from './models';

@ApiBearerAuth()
@ApiUseTags('heroes')
@Controller('heroes')
export class HeroesController {

    constructor(private readonly heroesService: HeroesService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Successfully retrieved hero resources.' })
    public getAll(): Promise<Hero[]> {

        return this.heroesService.getAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Successfully retrieved hero resource.' })
    @ApiResponse({ status: 404, description: 'Hero resource was not found.' })
    public async getOne(@Param('id') id: string): Promise<Hero> {

        const hero: Hero | undefined = await this.heroesService.getOne(id);

        if (hero === undefined) {
            throw new NotFoundException();
        }

        return hero;
    }

    @Get('search/:name')
    @ApiResponse({ status: 200, description: 'Successfully retrieved hero resources.' })
    public async search(@Param('name') name: string): Promise<Hero[]> {

        return this.heroesService.searchByName(name);
    }

    @Post()
    @ApiResponse({ status: 202, description: 'Successfully created a new hero resource.' })
    @ApiResponse({ status: 400, description: 'Failed to process the request due to invalid syntax.' })
    public post(@Body() command: CreateHeroCommand): Promise<Hero> {

        return this.heroesService.create(command);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Successfully updated hero resource.' })
    @ApiResponse({ status: 400, description: 'Failed to process the request due to invalid syntax.' })
    @ApiResponse({ status: 404, description: 'Hero resource was not found.' })
    public put(@Param('id') id: string, @Body() command: ChangeHeroNameCommand): Promise<Hero> {

        if (id !== command.id) {
            throw new BadRequestException();
        }

        return this.heroesService.changeName(command);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Successfully deleted hero resource.' })
    @ApiResponse({ status: 400, description: 'Failed to process the request due to invalid syntax.' })
    @ApiResponse({ status: 404, description: 'Hero resource was not found.' })
    public delete(@Param('id') id: string): Promise<void> {

        return this.heroesService.delete(id);
    }
}
