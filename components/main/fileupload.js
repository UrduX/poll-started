import React, { forwardRef } from "react";

import styled from "styled-components";

const FileUpload = forwardRef(({ onChange }, ref) => {
  return <FileUploadInput ref={ref} onChange={onChange} type="file" />;
});

export default FileUpload;

const FileUploadInput = styled.input`
  visibility: visible;
  height: 0px;
  width: 0px;
`;
