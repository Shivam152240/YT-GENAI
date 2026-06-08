import {  useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getme } from "./auth.api";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Verify user session on app initialization
    useEffect(() => {
        const verifySession = async () => {
            try {
                const data = await getme()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (err) {
                // Token is invalid or expired - user remains logged out
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        verifySession()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
