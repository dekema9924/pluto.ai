import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../api/usersApi';
import { loginUser } from '../features/userSlice';
import type { RootState } from '../store/store';

const useGetUser = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 1.getting from API
                const res = await fetchUserProfile();
                const userData = res.data.result;
                console.log("Fetched user data from API:", userData);

                dispatch(loginUser({ id: userData._id, ...userData }));

            } catch (err: any) {
                console.error("API fetch failed, trying localStorage...");

            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch]);


    return { user, loading };
};

export default useGetUser;
