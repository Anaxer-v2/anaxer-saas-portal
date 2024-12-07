import './index.css'
import { useState, useEffect, useRef } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

declare global {
  interface Window {
    SurveyCreator: any;
  }
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const surveyCreatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session && typeof window !== 'undefined' && window.SurveyCreator) {
      const creatorOptions = {
        showLogicTab: true,
        isAutoSave: true
      };

      const creator = new window.SurveyCreator.SurveyCreator(creatorOptions);

      if (surveyCreatorRef.current) {
        creator.render(surveyCreatorRef.current);
      }
    }
  }, [session]);

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <div>
        <div>Logged in!</div>
        <div ref={surveyCreatorRef} style={{ height: "100vh", width: "100%" }} />
      </div>
    )
  }
}