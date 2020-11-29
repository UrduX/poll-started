import Image from "next/image";
import styled from "styled-components";

export default function Custom404() {
  return (
    <PageNotFoundContainer>
      <Image src="/images/404_page_not_found.svg" height={400} width={400} />
    </PageNotFoundContainer>
  );
}
const PageNotFoundContainer = styled.div`
  display: grid;
  grid-column: 60%;
  padding: 2rem;
`;
