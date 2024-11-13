import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/fights.scss';

const Fights = () => {
  const { userId } = useUser();
  const [users, setUsers] = useState<any[]>([]);
  const [userTwoId, setUserTwoId] = useState<number | null>(null);
  const [selectedUserTwoTemtem, setSelectedUserTwoTemtem] = useState<any | null>(null);
  const [selectedUserOneTemtem, setSelectedUserOneTemtem] = useState<any | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [battleLogs, setBattleLogs] = useState<string[]>([]);

  const [userTemtems, setUserTemtems] = useState<any[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<any | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/user/', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  // Fetch Temtems for the logged-in user
  const fetchUserTemtems = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/inventory/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setSelectedInventory(data.data);
    } catch (error) {
      console.error('Failed to fetch temtems', error);
    }
  };

  // Fetch opponent's Temtems
  const fetchOpponentTemtems = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/inventory/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setUserTemtems(data.data.Temtems || []);
    } catch (error) {
      console.error('Failed to fetch temtems', error);
    }
  };

  // Fetch skills for a Temtem
  const fetchTemtemSkills = async (temtemId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/temtemSkill/${temtemId}/skill/`, {
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

  // Fetch opponent's Temtems on change
  useEffect(() => {
    if (userTwoId) {
      fetchOpponentTemtems(userTwoId);
    }
  }, [userTwoId]);

  // Calculate damage
  const calculateDamage = (attacker: any, defender: any, skill: any) => {
    let damage = skill.damage;

    if (attacker.type_one === 'Water' && defender.type_one === 'Fire') {
      damage *= 1.5;
    } else if (attacker.type_one === 'Fire' && defender.type_one === 'Water') {
      damage *= 0.5;
    }

    return damage;
  };

  // Handle fight logic
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
  
    // Get the usernames for battle logs
    const userOneName = users.find(user => user.id === user_one)?.username || `User ${user_one}`;
    const userTwoName = users.find(user => user.id === user_two)?.username || `User ${user_two}`;
  
    setBattleLogs([]);
    setResult(null);
  
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_one.name} (${userOneName}) starts with ${temtem_one.health} health.`,
      `${temtem_two.name} (${userTwoName}) starts with ${temtem_two.health} health.`
    ]);
  
    // Turn 1: User One attacks
    userTwoHealth -= calculateDamage(temtem_one, temtem_two, userOneSkill);
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_one.name} (${userOneName}) attacks ${temtem_two.name} (${userTwoName}) with ${userOneSkill.name}, dealing ${userOneSkill.damage} damage.`
    ]);
  
    // Check if User Two is knocked out after User One's attack
    if (userTwoHealth <= 0) {
      setBattleLogs((logs) => [
        ...logs,
        `${temtem_two.name} (${userTwoName}) is knocked out!`
      ]);
      setResult(`${temtem_one.name} (${userOneName}) wins!`);
      return; // End the battle after knockout
    }
  
    // Turn 2: User Two attacks
    userOneHealth -= calculateDamage(temtem_two, temtem_one, userTwoSkill);
    setBattleLogs((logs) => [
      ...logs,
      `${temtem_two.name} (${userTwoName}) attacks ${temtem_one.name} (${userOneName}) with ${userTwoSkill.name}, dealing ${userTwoSkill.damage} damage.`
    ]);
  
    // Check if User One is knocked out after User Two's attack
    if (userOneHealth <= 0) {
      setBattleLogs((logs) => [
        ...logs,
        `${temtem_one.name} (${userOneName}) is knocked out!`
      ]);
      setResult(`${temtem_two.name} (${userTwoName}) wins!`);
      return; // End the battle after knockout
    }
  
    // If both are still standing, determine the winner based on remaining health
    if (userOneHealth > userTwoHealth) {
      setResult(`${temtem_one.name} (${userOneName}) wins!`);
    } else {
      setResult(`${temtem_two.name} (${userTwoName}) wins!`);
    }
  
    // Save result to backend
    try {
      const response = await fetch('http://localhost:3001/api/fight/', {
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
      <h1>Battle Setup</h1>

      <label>Select Your Temtem:</label>
      <select
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

      <label>Select Opponent:</label>
      <select
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

      <label>Select Opponent's Temtem:</label>
      <select
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
      <button onClick={handleFight}>Start Fight</button>

      <h2>Fight Result:</h2>
      <p>{result}</p>

      <h3>Battle Logs:</h3>
      <ul>
        {battleLogs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fights;
