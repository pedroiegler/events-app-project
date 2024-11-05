import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 28px;
  padding: 16px 16px 25px 16px;
  width: 250px;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #fff;

  &:hover {
    transform: scale(1.01);
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  height: 25px;
  padding: 3px;
  border: 1px solid #000;
  position: relative;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #000;
  border-radius: 8px;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`;

export const MetaAchievedText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  height: 100%;
  font-size: 10px;
`;

export const Container = styled.div`
  margin: 30px auto;
  max-width: 1400px;
  z-index: 2;
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 25px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 15px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:focus {
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  padding: 7px 10px;
  font-size: 13px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
  appearance: none;
  cursor: pointer;
  background-color: #fff;

  &:focus {
    border-color: #007bff;
  }
`;

export const LoginButton = styled.button`
  outline: none;
  font-size: 12px;
  padding: 10px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #DB4437;
  color: white;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
  margin-left: 20px;

  &:hover {
      transform: scale(1.03);
  }

  &:active {
      transform: scale(0.95);
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 65px;
  right: 5px;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 10;

  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    right: -75px;
  }
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ContainerFilter = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 60%;
  }
`;