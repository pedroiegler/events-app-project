import React from "react";
import { FilterWrapper, ContainerFilter, Label, Input, Select } from "../styles";

const Filters = ({ 
  searchName, 
  searchStartDate, 
  searchEndDate, 
  searchCategory, 
  onNameChange, 
  onStartDateChange, 
  onEndDateChange, 
  onCategoryChange 
}) => (
  <ContainerFilter>
    <FilterWrapper>
      <Label htmlFor="input-name-search">Filtrar por nome</Label>
      <Input
        type="text"
        id="input-name-search"
        value={searchName}
        onChange={onNameChange}
      />
    </FilterWrapper>
    <FilterWrapper>
      <Label htmlFor="input-start-date-search">Data Inicial</Label>
      <Input
        type="date"
        value={searchStartDate}
        id="input-start-date-search"
        onChange={onStartDateChange}
      />
    </FilterWrapper>
    <FilterWrapper>
      <Label htmlFor="input-end-date-search">Data Final</Label>
      <Input
        type="date"
        value={searchEndDate}
        id="input-end-date-search"
        onChange={onEndDateChange}
      />
    </FilterWrapper>
    <FilterWrapper>
      <Label htmlFor="input-category-search">Filtrar por Categoria</Label>
      <Select
        id="input-category-search"
        value={searchCategory}
        onChange={onCategoryChange}
      >
        <option value="">Todas</option>
        <option value="música">Música</option>
        <option value="esporte">Esporte</option>
        <option value="tecnologia">Tecnologia</option>
        <option value="entretenimento">Entretenimento</option>
      </Select>
    </FilterWrapper>
  </ContainerFilter>
);

export default Filters;