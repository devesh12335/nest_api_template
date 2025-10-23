import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody, 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiNotFoundResponse, 
  ApiNoContentResponse 
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contacts')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDto })
  @ApiCreatedResponse({ description: 'The contact has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all contacts' })
  @ApiOkResponse({ description: 'List of contacts returned successfully.' })
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID', type: Number })
  @ApiOkResponse({ description: 'Contact retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Contact not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID', type: Number })
  @ApiBody({ type: UpdateContactDto })
  @ApiOkResponse({ description: 'Contact updated successfully.' })
  @ApiNotFoundResponse({ description: 'Contact not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID', type: Number })
  @ApiNoContentResponse({ description: 'Contact deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Contact not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(+id);
  }
}