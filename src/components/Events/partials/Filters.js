import React from "react";
import { FilterWrapper, ContainerFilter, Label, Input, Select } from "../styles";

const Filters = ({ searchName, searchDate, searchCategory, onNameChange, onDateChange, onCategoryChange }) => (
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
      <Label htmlFor="input-date-search">Filtrar por Data</Label>
      <Input
        type="date"
        value={searchDate}
        id="input-date-search"
        onChange={onDateChange}
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