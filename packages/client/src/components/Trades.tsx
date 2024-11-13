import { useEffect, useState } from 'react';
import '../styles/trades.scss';
import { useUser } from '../context/UserContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { tradeSchema } from '../dependancies/schemas/trade';

type FormValues = {
  user_two: number;
  temtem_id: number;
};

const Trades = () => {
  const { userId, role } = useUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(tradeSchema),
  });
  const [ userTemtems, setUserTemtems ] = useState<any[]>([]);
  const [ showHistory, setShowHistory ] = useState(false);

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/user/', {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      return res.json();
    },
  });

  const { data: inventory, isLoading: inventoryLoading } = useQuery({
    queryKey: ['inventory', userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/inventory/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch inventory');
      }

      return res.json();
    },
    enabled: !!userId
  });

  const { data: trades, isLoading: tradesLoading } = useQuery({
    queryKey: ['trades', userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/trade?userId=${userId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch trades');
      }

      return res.json();
    },
    enabled: role === 'admin',
  });

  const { mutate: createTrade, status } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch('http://localhost:3001/api/trade/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...data, user_one: userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to create trade');
      }

      return res.json();
    },
    onSuccess: () => {
      alert('Trade created successfully');
      reset();
    },
    onError: (error: any) => {
      alert(`Error creating trade: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createTrade(data);
  };

  useEffect(() => {
    if (inventory?.data?.Temtems) {
      setUserTemtems(inventory.data.Temtems);
    }
  }, [inventory]);

  const userLookup = users?.data?.reduce((acc: any, user: any) => {
    acc[user.id] = user.username;
    return acc;
  }, {});

  const temtemLookup = inventory?.data?.Temtems?.reduce((acc: any, temtem: any) => {
    acc[temtem.id] = temtem.name;
    return acc;
  }, {});

  if (userId === 0) {
    return <div>You must be connected to use Trades</div>;
  }

  return (
    <div className="trade-form">
      <h2>{showHistory ? 'Trade History' : 'Create a Trade'}</h2>

      {role === 'admin' && (
        <div className="tabs">
          <button onClick={() => setShowHistory(false)} disabled={!showHistory}>
            Create Trade
          </button>

            <button onClick={() => setShowHistory(true)} disabled={showHistory}>
              Trade History
            </button>
        </div>
      )}

      {!showHistory && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="user_two">Select User:</label>
            <select id="user_two" {...register('user_two')}>
              <option value="">Select a user</option>
              {usersLoading ? (
                <option>Loading users...</option>
              ) : (
                users?.data?.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))
              )}
            </select>
            {errors.user_two && <p>{errors.user_two.message}</p>}
          </div>
          
          <div>
            <label htmlFor="temtem_id">Select Temtem to Trade:</label>
            <select id="temtem_id" {...register('temtem_id')}>
              <option value="">Select a Temtem</option>
              {inventoryLoading ? (
                <option>Loading...</option>
              ) : (
                userTemtems.length > 0 ? (
                  userTemtems.map((temtem: any) => (
                    <option key={temtem.id} value={temtem.id}>
                      {temtem.name}
                    </option>
                  ))
                ) : (
                  <option>No Temtems in your inventory</option>
                )
              )}
            </select>
            {errors.temtem_id && <p>{errors.temtem_id.message}</p>}
          </div>

          <button type="submit" disabled={status === 'pending'}>
            {status === 'pending' ? 'Creating Trade...' : 'Create Trade'}
          </button>
        </form>
      )}

      {showHistory && role === 'admin' && (
        <div className="trade-history">
          {tradesLoading ? (
            <p>Loading trade history...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Trade ID</th>
                  <th>User 1</th>
                  <th>User 2</th>
                  <th>Temtem</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {trades?.data?.map((trade: any) => (
                  <tr key={trade.id}>
                    <td>{trade.id}</td>
                    <td>{userLookup[trade.user_one] || trade.user_one}</td>
                    <td>{userLookup[trade.user_two] || trade.user_two}</td>
                    <td>{temtemLookup[trade.temtem_id] || trade.temtem_id}</td>
                    <td>{new Date(trade.time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Trades;
