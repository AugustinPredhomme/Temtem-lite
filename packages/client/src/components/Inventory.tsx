import { useEffect, useState } from 'react';
import '../styles/inventory.scss';
import { useGlobalState } from '../context/GlobalStateContext';
import { useUser } from '../context/UserContext';
import { URI, PORT } from '../config/env';

const Inventory = () => {
  const { userId } = useUser();
  const { 
    temtems, setTemtems,
    loading, setLoading,
    error, setError,
    selectedTemtemId, setSelectedTemtemId,
    selectedTemtemName, setSelectedTemtemName,
    skills, setSkills,
    loadingSkills, setLoadingSkills,
   } = useGlobalState();

  useEffect(() => {
    const fetchInventory = async () => {
      if (userId === 0) {
        return;
      }

      try {
        const response = await fetch(`${URI}:${PORT}/api/inventory/${userId}`, {
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
  }, [setError, setLoading, setTemtems, userId]);

  const handleTemtemClick = async (temtemId: number, temtemName: string) => {
    setSelectedTemtemId(temtemId);
    setSelectedTemtemName(temtemName);
    setLoadingSkills(true);

    try {
      const res = await fetch(`${URI}:${PORT}/api/temtemSkill/${temtemId}/skill`, {
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
      <header>
      <h1>My Inventory</h1>
      </header>
      <main>
      <h2>Temtem Collection</h2>
      {temtems.length === 0 ? (
        <p>No Temtem found in this inventory.</p>
      ) : (
        <ul>
        {temtems.map((temtem) => (
          <li key={temtem.id}>
          <button 
            onClick={() => handleTemtemClick(temtem.id, temtem.name)} 
            tabIndex={0} 
            aria-label={`View details of ${temtem.name}`}
          >
            <h3>{temtem.name}</h3>
            <p>Health: {temtem.health}</p>
            <p>Type: {temtem.type_one}</p>
          </button>
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
      </main>
    </div>
  );
};

export default Inventory;