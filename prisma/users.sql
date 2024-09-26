SELECT auth_users.id,
    auth_users.email,
    public_users.full_name
FROM auth.users AS auth_users
    INNER JOIN public.users AS public_users ON auth_users.id = public_users.user_id;