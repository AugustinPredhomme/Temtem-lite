import React, { createContext, useContext, useState, ReactNode } from 'react';

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

type GlobalStateContextType = {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  userTwoId: number | null;
  setUserTwoId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUserTwoTemtem: any | null;
  setSelectedUserTwoTemtem: React.Dispatch<React.SetStateAction<any | null>>;
  selectedUserOneTemtem: any | null;
  setSelectedUserOneTemtem: React.Dispatch<React.SetStateAction<any | null>>;
  result: string | null;
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
  battleLogs: string[];
  setBattleLogs: React.Dispatch<React.SetStateAction<string[]>>;
  userTemtems: any[];
  setUserTemtems: React.Dispatch<React.SetStateAction<any[]>>;
  selectedInventory: any | null;
  setSelectedInventory: React.Dispatch<React.SetStateAction<any | null>>;
  temtems: Temtem[];
  setTemtems: React.Dispatch<React.SetStateAction<Temtem[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTemtemId: number | null;
  setSelectedTemtemId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedTemtemName: string | null;
  setSelectedTemtemName: React.Dispatch<React.SetStateAction<string | null>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  loadingSkills: boolean;
  setLoadingSkills: React.Dispatch<React.SetStateAction<boolean>>;
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  firstName: string | null;
  setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
  lastName: string | null;
  setLastName: React.Dispatch<React.SetStateAction<string | null>>;
  birthday: string | null;
  setBirthday: React.Dispatch<React.SetStateAction<string | null>>;
  country: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
  phone: string | null;
  setPhone: React.Dispatch<React.SetStateAction<string | null>>;
  skillId: number | null;
  setSkillId: React.Dispatch<React.SetStateAction<number | null>>;
  skillName: string | null;
  setSkillName: React.Dispatch<React.SetStateAction<string | null>>;
  damage: number | null;
  setDamage: React.Dispatch<React.SetStateAction<number | null>>;
  cooldown: number | null;
  setCooldown: React.Dispatch<React.SetStateAction<number | null>>;
  temtemId: number | null;
  setTemtemId: React.Dispatch<React.SetStateAction<number | null>>;
  temtemName: string | null;
  setTemtemName: React.Dispatch<React.SetStateAction<string | null>>;
  temtemHealth: number | null;
  setTemtemHealth: React.Dispatch<React.SetStateAction<number | null>>;
  temtemTypeOne: string | null;
  setTemtemTypeOne: React.Dispatch<React.SetStateAction<string | null>>;
  temtemIds: number[];
  setTemtemIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [userTwoId, setUserTwoId] = useState<number | null>(null);
  const [selectedUserTwoTemtem, setSelectedUserTwoTemtem] = useState<any | null>(null);
  const [selectedUserOneTemtem, setSelectedUserOneTemtem] = useState<any | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [userTemtems, setUserTemtems] = useState<any[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<any | null>(null);

  const [temtems, setTemtems] = useState<Temtem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTemtemId, setSelectedTemtemId] = useState<number | null>(null);
  const [selectedTemtemName, setSelectedTemtemName] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState<boolean>(false);

  const [showHistory, setShowHistory] = useState<boolean>(false);

  //Nav
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //Dashboard
  const [userId, setUserId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [skillId, setSkillId] = useState<number | null>(null);
  const [skillName, setSkillName] = useState<string | null>(null);
  const [damage, setDamage] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [temtemId, setTemtemId] = useState<number | null>(null);
  const [temtemName, setTemtemName] = useState<string | null>(null);
  const [temtemHealth, setTemtemHealth] = useState<number | null>(null);
  const [temtemTypeOne, setTemtemTypeOne] = useState<string | null>(null);
  const [temtemIds, setTemtemIds] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        users, setUsers,
        userTwoId, setUserTwoId,
        selectedUserTwoTemtem, setSelectedUserTwoTemtem,
        selectedUserOneTemtem, setSelectedUserOneTemtem,
        result, setResult,
        battleLogs, setBattleLogs,
        userTemtems, setUserTemtems,
        selectedInventory, setSelectedInventory,
        temtems, setTemtems,
        loading, setLoading,
        error, setError,
        selectedTemtemId, setSelectedTemtemId,
        selectedTemtemName, setSelectedTemtemName,
        skills, setSkills,
        loadingSkills, setLoadingSkills,
        showHistory, setShowHistory,
        menuOpen, setMenuOpen,
        userId, setUserId,
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
        temtemIds, setTemtemIds,
        selectedUserId, setSelectedUserId,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
