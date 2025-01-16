import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useUser } from '../context/UserContext';
import '../styles/fights.scss';
import { URI, PORT } from '../config/env';

const Fights = () => {
  const { userId } = useUser();
  const {
    users, setUsers,
    userTwoId, setUserTwoId,
    selectedUserTwoTemtem, setSelectedUserTwoTemtem,
    selectedUserOneTemtem, setSelectedUserOneTemtem,
    result, setResult,
    battleLogs, setBattleLogs,
    userTemtems, setUserTemtems,
    selectedInventory, setSelectedInventory,
  } = useGlobalState();

  // GET All Users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${URI}:${PORT}/api/user/`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  // GET Logged-in User Temtems
  const fetchUserTemtems = async (userId: number) => {
    try {
      const res = await fetch(`${URI}:${PORT}/api/inventory/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setSelectedInventory(data.data);
    } catch (error) {
      console.error('Failed to fetch temtems', error);
    }
  };

  // GET Opponent Temtems
  const fetchOpponentTemtems = async (userId: number) => {
    try {
      const res = await fetch(`${URI}:${PORT}/api/inventory/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setUserTemtems(data.data.Temtems || []);
    } catch (error) {
      console.error('Failed to fetch temtems', error);
    }
  };

  // GET Specific Temtem Skills
  const fetchTemtemSkills = async (temtemId: number) => {
    try {
      const res = await fetch(`${URI}:${PORT}/api/temtemSkill/${temtemId}/skill/`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      return data.data.Skills || [];
    } catch (error) {
      console.error('Failed to fetch temtem skills', error);
      return [];
    }
  };

  useEffect(() => {
    if (userTwoId) {
      fetchOpponentTemtems(userTwoId);
    }
  }, [userTwoId]);

  const calculateDamage = (attacker: any, defender: any, skill: any) => {
    let damage = skill.damage;

    if (attacker.type_one === 'Water' && defender.type_one === 'Fire') {
      damage *= 1.5;
    } else if (attacker.type_one === 'Fire' && defender.type_one === 'Water') {
      damage *= 0.5;
    }

    return damage;
  };

  const handleFight = async () => {
    if (!selectedUserOneTemtem || !selectedUserTwoTemtem) {
      alert('Please select both Temtems to fight');
      return;
    }
  
    const user_one = userId;
    const user_two = userTwoId;
    const temtem_one = selectedUserOneTemtem;
    const temtem_two = selectedUserTwoTemtem;
  
    let userOneHealth = temtem_one.health;
    let userTwoHealth = temtem_two.health;
  
    const userOneSkills = await fetchTemtemSkills(temtem_one.id);
    const userTwoSkills = await fetchTemtemSkills(temtem_two.id);
  
    const userOneSkill = userOneSkills[0];
    const userTwoSkill = userTwoSkills[0];
  
    const userOneName = users.find(user => user.id === user_one)?.username || `User ${user_one}`;
    const userTwoName = users.find(user => user.id === user_two)?.username || `User ${user_two}`;
  
    setBattleLogs([]);
    setResult(null);
  
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_one.name} (${userOneName}) starts with ${temtem_one.health} health.`,
      `${temtem_two.name} (${userTwoName}) starts with ${temtem_two.health} health.`
    ]);
  
    // User 1 attacks
    userTwoHealth -= calculateDamage(temtem_one, temtem_two, userOneSkill);
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_one.name} (${userOneName}) attacks ${temtem_two.name} (${userTwoName}) with ${userOneSkill.name}, dealing ${userOneSkill.damage} damage.`
    ]);
  
    if (userTwoHealth <= 0) {
      setBattleLogs((logs) => [
        ...logs,
        `${temtem_two.name} (${userTwoName}) is knocked out!`
      ]);
      setResult(`${temtem_one.name} (${userOneName}) wins!`);
      return;
    }
  
    // User 2 attacks
    userOneHealth -= calculateDamage(temtem_two, temtem_one, userTwoSkill);
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_two.name} (${userTwoName}) attacks ${temtem_one.name} (${userOneName}) with ${userTwoSkill.name}, dealing ${userTwoSkill.damage} damage.`
    ]);
  
    if (userOneHealth <= 0) {
      setBattleLogs((logs) => [
        ...logs,
        `${temtem_one.name} (${userOneName}) is knocked out!`
      ]);
      setResult(`${temtem_two.name} (${userTwoName}) wins!`);
      return;
    }
  
    if (userOneHealth > userTwoHealth) {
      setResult(`${temtem_one.name} (${userOneName}) wins!`);
    } else {
      setResult(`${temtem_two.name} (${userTwoName}) wins!`);
    }
  
    // Save result to DB
    try {
      const response = await fetch(`${URI}:${PORT}/api/fight/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_one,
          user_two,
          winner: result && result.includes(temtem_one.name) ? user_one : user_two,
        }),
      });
      const data = await response.json();
      console.log('Fight result saved:', data);
    } catch (error) {
      console.error('Error saving fight result:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (userId) {
      fetchUserTemtems(userId);
    }
  }, [userId]);

  return (
    <div className='fight'>
      <header>
      <h1>Battle Setup</h1>
      </header>
      <main>
      <label htmlFor="userTemtem">Select Your Temtem:</label>
      <select
        id="userTemtem"
        tabIndex={0}
        value={selectedUserOneTemtem?.id || ''}
        onChange={(e) =>
        setSelectedUserOneTemtem(
          selectedInventory.Temtems.find(
          (temtem: any) => temtem.id === Number(e.target.value)
          )
        )
        }
      >
        <option value="">Select a Temtem</option>
        {selectedInventory?.Temtems?.map((temtem: any) => (
        <option key={temtem.id} value={temtem.id}>
          {temtem.name}
        </option>
        ))}
      </select>

      <label htmlFor="opponent">Select Opponent:</label>
      <select
        id="opponent"
        tabIndex={1}
        value={userTwoId || ''}
        onChange={(e) => setUserTwoId(Number(e.target.value))}
      >
        <option value="">Select a user</option>
        {users.map((user: any) => (
        user.id !== userId && (
          <option key={user.id} value={user.id}>
          {user.username || `User ${user.id}`}
          </option>
        )
        ))}
      </select>

      <label htmlFor="opponentTemtem">Select Opponent's Temtem:</label>
      <select
        id="opponentTemtem"
        tabIndex={2}
        value={selectedUserTwoTemtem?.id || ''}
        onChange={(e) =>
        setSelectedUserTwoTemtem(
          userTemtems.find((temtem) => temtem.id === Number(e.target.value))
        )
        }
      >
        <option value="">Select a Temtem</option>
        {userTemtems.length > 0 ? (
        userTemtems.map((temtem: any) => (
          <option key={temtem.id} value={temtem.id}>
          {temtem.name}
          </option>
        ))
        ) : (
        <option value="">No Temtems available</option>
        )}
      </select>

      <br />
      <button tabIndex={3} onClick={handleFight}>Start Fight</button>

      <h2>Fight Result:</h2>
      <p>{result}</p>

      <h3>Battle Logs:</h3>
      <ul>
        {battleLogs.map((log, index) => (
        <li key={index}>{log}</li>
        ))}
      </ul>
      </main>
    </div>
  );
};

export default Fights;
