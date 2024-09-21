drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 初めてログインし、auth.users に新しいユーザーが追加されたときに、profiles テーブルに新しいユーザーを追加するfunction
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
