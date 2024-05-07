import React from 'react';
import { Row, Col } from 'antd';
import CharacterCard from '../organisms/CharacterCard';
import { CharactersTemplateProps } from '../../utils/types';

const CharactersTemplate: React.FC<CharactersTemplateProps> = ({
  characters,
}) => (
  <Row gutter={16}>
    {characters.map((character, index) => (
      <Col
        key={`${character.id}-${index}`}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
      >
        <CharacterCard character={character} />
      </Col>
    ))}
  </Row>
);

export default CharactersTemplate;
