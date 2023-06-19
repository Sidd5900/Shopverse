import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  padding: 5px;
`;

const Announcement = () => {
  return (
    <Container>Super Deal! Free Shipping on Orders Over Rs. 500</Container>
  );
};

export default Announcement;
