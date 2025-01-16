import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useUser } from '../context/UserContext';
import { URI, PORT, REACT_ENV } from '../config/env';
import '../styles/dashboard.scss';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('users');
    const { userId, role } = useUser();
    const {
        selectedUserId, setSelectedUserId,
        firstName, setFirstName,
        lastName, setLastName,
        birthday, setBirthday,
        country, setCountry,
        phone, setPhone,
        skillId, setSkillId,
        skillName, setSkillName,
        damage, setDamage,
        cooldown, setCooldown,
        temtemId, setTemtemId,
        temtemName, setTemtemName,
        temtemHealth, setTemtemHealth,
        temtemTypeOne, setTemtemTypeOne,
        temtemIds, setTemtemIds
    } = useGlobalState();

    const handleButtonClick = async (route: string, method: string = 'GET', data: any = null) => {
        try {
            const response = await fetch(`${URI}:${PORT}/api/${route}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
            credentials: 'include',
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    if (role !== 'admin') {
        return <div>Access denied. Admins only.</div>;
    }

    return (
        <section className="dashboard">
            <h1>Admin Dashboard</h1>
            <nav className="dashboard-nav">
                <button onClick={() => setActiveTab('users')}>Users</button>
                <button onClick={() => setActiveTab('skills')}>Skills</button>
                <button onClick={() => setActiveTab('temtems')}>Temtems</button>
                <button onClick={() => setActiveTab('inventory')}>Inventory</button>
                <button onClick={() => setActiveTab('trades')}>Trades</button>
                <button onClick={() => setActiveTab('fights')}>Fights</button>
                {REACT_ENV === 'development' && (
                    <button onClick={() => setActiveTab('debug')}>Debug</button>
                )}
            </nav>
            <main className="dashboard-content">
            {activeTab === 'users' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('user/admin')}>Get All Users (Admin)</button>
                <button onClick={() => handleButtonClick('user')}>Get All Users (Client)</button>
                <input
                    type="text"
                    placeholder="User ID"
                    value={selectedUserId ?? ''}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                />
                <button onClick={() => handleButtonClick(`user/profile/${userId}`)}>Check User Profile</button>
                <form className="dashboard-form">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={selectedUserId ?? ''}
                        onChange={(e) => setSelectedUserId(Number(e.target.value))}
                    />
                    <input
                    type="text"
                    placeholder="First Name"
                    value={firstName ?? ''}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName ?? ''}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                    type="date"
                    placeholder="Birthday"
                    value={birthday ?? ''}
                    onChange={(e) => setBirthday(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Country"
                    value={country ?? ''}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Phone"
                    value={phone ?? ''}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                    <button type="button" onClick={() => handleButtonClick(`user/profile/${userId}`, 'POST', {
                    firstName,
                    lastName,
                    birthday,
                    country,
                    phone
                    })}>Modify User Profile</button>
                </form>
                </section>
            )}
            {activeTab === 'skills' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('skill', 'POST', {
                    name: skillName,
                    damage,
                    cooldown
                })}>Create Skill</button>
                <button onClick={() => handleButtonClick('skill')}>Get All Skills</button>
                <input
                    type="text"
                    placeholder="Skill ID"
                    value={skillId ?? ''}
                    onChange={(e) => setSkillId(Number(e.target.value))}
                />
                <button onClick={() => handleButtonClick(`skill/${skillId}`)}>Check Skill</button>
                <form className="dashboard-form">
                    <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillName ?? ''}
                    onChange={(e) => setSkillName(e.target.value)}
                    />
                    <input
                    type="number"
                    placeholder="Damage"
                    value={damage ?? ''}
                    onChange={(e) => setDamage(Number(e.target.value))}
                    />
                    <input
                    type="number"
                    placeholder="Cooldown"
                    value={cooldown ?? ''}
                    onChange={(e) => setCooldown(Number(e.target.value))}
                    />
                    <button type="button" onClick={() => handleButtonClick(`skill/${skillId}`, 'POST', {
                    name: skillName,
                    damage,
                    cooldown
                    })}>Modify Skill</button>
                </form>
                </section>
            )}
            {activeTab === 'temtems' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('temtem', 'POST', {
                    name: temtemName,
                    health: temtemHealth,
                    type_one: temtemTypeOne
                })}>Create Temtem</button>
                <button onClick={() => handleButtonClick('temtem')}>Get All Temtems</button>
                <input
                    type="text"
                    placeholder="Temtem ID"
                    value={temtemId ?? ''}
                    onChange={(e) => setTemtemId(Number(e.target.value))}
                />
                <button onClick={() => handleButtonClick(`temtem/${temtemId}`)}>Check Temtem</button>
                <form className="dashboard-form">
                    <input
                    type="text"
                    placeholder="Temtem Name"
                    value={temtemName ?? ''}
                    onChange={(e) => setTemtemName(e.target.value)}
                    />
                    <input
                    type="number"
                    placeholder="Health"
                    value={temtemHealth ?? ''}
                    onChange={(e) => setTemtemHealth(Number(e.target.value))}
                    />
                    <input
                    type="text"
                    placeholder="Type One"
                    value={temtemTypeOne ?? ''}
                    onChange={(e) => setTemtemTypeOne(e.target.value)}
                    />
                    <button type="button" onClick={() => handleButtonClick(`temtem/${temtemId}`, 'POST', {
                    name: temtemName,
                    health: temtemHealth,
                    type_one: temtemTypeOne
                    })}>Modify Temtem</button>
                </form>
                </section>
            )}
            {activeTab === 'inventory' && (
                <section className="dashboard-section">
                <form className="dashboard-form">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={selectedUserId ?? ''}
                        onChange={(e) => setSelectedUserId(Number(e.target.value))}
                    />
                    <input
                    type="text"
                    placeholder="Temtem IDs (comma separated)"
                    value={temtemIds.join(',')}
                    onChange={(e) => setTemtemIds(e.target.value.split(',').map(id => parseInt(id.trim())))}
                    />
                    <button type="button" onClick={() => handleButtonClick('inventory', 'POST', {
                    temtemIds
                    })}>Add Temtem to Inventory</button>
                </form>
                <input
                    type="text"
                    placeholder="User ID"
                    value={selectedUserId ?? ''}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                />
                <button onClick={() => handleButtonClick(`inventory/${userId}`)}>Check Inventory</button>
                <button onClick={() => handleButtonClick('inventory')}>Check All Inventories</button>
                <input
                    type="text"
                    placeholder="User ID"
                    value={selectedUserId ?? ''}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Temtem ID"
                    value={temtemId ?? ''}
                    onChange={(e) => setTemtemId(Number(e.target.value))}
                />
                <button onClick={() => handleButtonClick(`inventory/${userId}/${temtemId}`, 'DELETE')}>Delete Temtem from Inventory</button>
                </section>
            )}
            {activeTab === 'trades' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('trade')}>Get All Trades</button>
                </section>
            )}
            {activeTab === 'fights' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('fight')}>Get All Fights</button>
                </section>
            )}
            {activeTab === 'debug' && REACT_ENV === 'development' && (
                <section className="dashboard-section">
                <button onClick={() => handleButtonClick('debug/clear')}>Clear All Data</button>
                </section>
            )}
            </main>
        </section>
    );
};

export default Dashboard;