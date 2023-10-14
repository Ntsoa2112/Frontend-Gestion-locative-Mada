interface TokenData {
    ownerId: number;
    access_token: string;
  }
  
export default function extractTokenData(tokenString: string): TokenData | null {
    try {
        const tokenData = JSON.parse(tokenString) as TokenData
        return tokenData
    } catch (error) {
        return null
    }
}