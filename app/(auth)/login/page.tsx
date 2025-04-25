import ContinueWithGoogle from '@/components/continue-with-google';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <ContinueWithGoogle />
        </CardContent>
      </Card>
    </div>
  );
}
