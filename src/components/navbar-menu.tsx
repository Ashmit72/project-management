import { ThemeToggler } from '@/components/theme-toggler';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { authClient } from '@/lib/authClient';
import {
  BellRing,
  CircleCheckBig,
  ListTodo,
  OctagonAlert,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type AlertColor =
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'neutral'
  | 'primary';
type AlertIconName =
  | 'Sparkles'
  | 'OctagonAlert'
  | 'CircleCheckBig'
  | 'TriangleAlert';
type AlertItem = {
  id: number;
  color: AlertColor;
  title: string;
  icon: AlertIconName;
};

const alerts: AlertItem[] = [
  {
    id: 1,
    color: 'info',
    title: 'New update available',
    icon: 'Sparkles',
  },
  {
    id: 2,
    color: 'error',
    title: 'Deployment failed',
    icon: 'OctagonAlert',
  },
  {
    id: 3,
    color: 'success',
    title: 'Payment successful',
    icon: 'CircleCheckBig',
  },
  {
    id: 4,
    color: 'warning',
    title: 'High usage warning',
    icon: 'TriangleAlert',
  },
];

const NavbarMenu = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const session = authClient.useSession();
  const profile = {
    name: session.data?.user.name,
    avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
    email: session.data?.user.email,
  };

  const signout = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="w-full bg-elevation-level1 px-6 py-2 flex items-center justify-between">
      <Link to="/">
        <img src="/navbar/logo.png" alt="logo" className="cursor-pointer" />
      </Link>
      <div className="flex items-center justify-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer" size={'32'}>
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">User Details</div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <div className="font-medium">{profile.name}</div>
                <div className="text-fg-secondary">{profile.email}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                color="error"
                className="w-full"
                loading={isSigningOut}
                disabled={isSigningOut}
                onClick={signout}
              >
                {isSigningOut ? 'Logging out' : 'Logout'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <BellRing className="text-fg-secondary cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-center gap-1">
                  Your Notifications
                  <Badge
                    className="rounded-full p-1"
                    color="success"
                    variant="strong"
                  >
                    4+
                  </Badge>
                </div>
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex items-center flex-col gap-4">
                {alerts.map(alert => (
                  <Alert key={alert.id} color={alert.color} close>
                    <AlertIcon>
                      {alert.icon === 'Sparkles' && <Sparkles size={20} />}
                      {alert.icon === 'OctagonAlert' && (
                        <OctagonAlert size={20} />
                      )}
                      {alert.icon === 'CircleCheckBig' && (
                        <CircleCheckBig size={20} />
                      )}
                      {alert.icon === 'TriangleAlert' && (
                        <TriangleAlert size={20} />
                      )}
                    </AlertIcon>
                    <AlertTitle>{alert.title}</AlertTitle>
                  </Alert>
                ))}
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button color="info" className="w-full">
                  <ListTodo />
                  Mark all Read
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default NavbarMenu;
