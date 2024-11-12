import { useEffect, useState } from 'react';
import '../styles/inventory.scss';
import { useUser } from '../context/UserContext';

interface Temtem {
  id: number;
  name: string;
  health: number;
  type_one: string;
}

interface Skill {
  id: number;
  name: string;
  damage: number;
  cooldown: number;
}

const Inventory = () => {
  const { userId } = useUser();
  const [ temtems, setTemtems ] = useState<Temtem[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  const [ selectedTemtemId, setSelectedTemtemId ] = useState<number | null>(null);
  const [ selectedTemtemName, setSelectedTemtemName ] = useState<string | null>(null);
  const [ skills, setSkills ] = useState<Skill[]>([]);
  const [ loadingSkills, setLoadingSkills ] = useState<boolean>(false);

  useEffect(() => {
    const fetchInventory = async () => {
      if (userId === 0) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/inventory/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const data = await response.json();
        console.log(data);

        if (data.message === 'Inventory checked successfully') {
          setTemtems(data.data.Temtems);
        } else {
          setError(data.message);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [userId]);

  const handleTemtemClick = async (temtemId: number, temtemName: string) => {
    setSelectedTemtemId(temtemId);
    setSelectedTemtemName(temtemName);
    setLoadingSkills(true);

    try {
      const res = await fetch(`http://localhost:3001/api/temtemSkill/${temtemId}/skill`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch Temtem skills');
      }

      const data = await res.json();
      if (data.message === 'Temtem skills checked successfully') {
        setSkills(data.data.Skills);
      } else {
        setError('Failed to load Temtem skills');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingSkills(false);
    }
  };

  if (userId === 0) {
    return (<div>You must be connected to use inventory</div>);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='inventory'>
      <h1>My Inventory</h1>
      <h2>Temtem Collection</h2>
      {temtems.length === 0 ? (
        <p>No Temtem found in this inventory.</p>
      ) : (
        <ul>
          {temtems.map((temtem) => (
            <li key={temtem.id} onClick={() => handleTemtemClick(temtem.id, temtem.name)}>
              <h3>{temtem.name}</h3>
              <p>Health: {temtem.health}</p>
              <p>Type: {temtem.type_one}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedTemtemId && (
        <div className='temtem-skills'>
          <h2>Skills of {selectedTemtemName}</h2>
          {loadingSkills ? (
            <div>Loading skills...</div>
          ) : (
            <ul>
              {skills.length === 0 ? (
                <p>No skills found for this Temtem.</p>
              ) : (
                skills.map((skill) => (
                  <li key={skill.id}>
                    <h4>{skill.name}</h4>
                    <p>Damage : {skill.damage}</p>
                    <p>Cooldown: {skill.cooldown} turns</p>
                    </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Inventory;