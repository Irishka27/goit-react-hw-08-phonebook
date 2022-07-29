import { css } from '@emotion/react';
import PuffLoader from 'react-spinners/PuffLoader';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
`;

export const Loader = () => {
  return <PuffLoader color="#4f95da" size={150} css={override} />;
};

export const LoaderButtons = () => {
  return <BeatLoader color="#4f95da" size={10} />;
};