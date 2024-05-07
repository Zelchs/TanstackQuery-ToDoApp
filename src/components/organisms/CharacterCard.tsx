import React, { useState, useEffect } from 'react';
import { Card, Modal } from 'antd';
import { fetchCharacterDetails } from '../../utils/api';
import { Character, CharacterCardProps } from '../../utils/types';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [visible, setVisible] = useState(false);
  const [detailedCharacter, setDetailedCharacter] = useState<Character | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      if (!detailedCharacter) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchCharacterDetails(character.id);
          setDetailedCharacter(data);
        } catch (error) {
          setError('Failed to fetch character details');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (visible) {
      loadCharacterDetails();
    }
  }, [character.id, detailedCharacter, visible]);

  const handleCardClick = () => {
    setVisible(true);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: 10 }}
        cover={<img alt={character.name} src={character.image} />}
        onClick={handleCardClick}
      >
        <Card.Meta
          title={character.name}
          description={`${character.status} - ${character.species}`}
        />
      </Card>
      <Modal
        title={detailedCharacter ? detailedCharacter.name : character.name}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {error && <p>Error: {error}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {detailedCharacter && (
              <>
                <p>
                  <strong>Status:</strong> {detailedCharacter.status}
                </p>
                <p>
                  <strong>Species:</strong> {detailedCharacter.species}
                </p>
                <p>
                  <strong>Gender:</strong> {detailedCharacter.gender}
                </p>
                <p>
                  <strong>Origin:</strong> {detailedCharacter.origin.name}
                </p>
                <p>
                  <strong>Location:</strong> {detailedCharacter.location.name}
                </p>
                <img
                  src={detailedCharacter.image}
                  alt={detailedCharacter.name}
                  style={{ width: '100%' }}
                />
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default CharacterCard;
