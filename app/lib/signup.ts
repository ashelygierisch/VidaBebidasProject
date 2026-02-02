import supabase from "./supabase-client"
async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'valid.email@supabase.io',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
  }

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}
 

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  return { session: data.session, error }
}

export { supabase }