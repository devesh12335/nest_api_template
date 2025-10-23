import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('states')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new state' })
  @ApiResponse({
    status: 201,
    description: 'The state has been successfully created.',
    type: State,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  // @ApiBearerAuth() // Uncomment if you are using authentication
  create(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.statesService.create(createStateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all states' })
  @ApiResponse({
    status: 200,
    description: 'A list of all states.',
    type: [State],
  })
  findAll(): Promise<State[]> {
    return this.statesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a state by ID' })
  @ApiResponse({
    status: 200,
    description: 'The state details.',
    type: State,
  })
  @ApiResponse({ status: 404, description: 'State not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<State> {
    return this.statesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing state by ID' })
  @ApiResponse({
    status: 200,
    description: 'The state has been successfully updated.',
    type: State,
  })
  @ApiResponse({ status: 404, description: 'State not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<State> {
    return this.statesService.update(id, updateStateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a state by ID' })
  @ApiResponse({
    status: 204,
    description: 'The state has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'State not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.statesService.remove(id);
  }
}