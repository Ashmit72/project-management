import { Link } from 'react-router-dom';
import { ThemeToggler } from '@/components/theme-toggler';
import { BellRing } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const NavbarMenu = () => {
  const profile = {
    name: 'Aurthur Dominic',
    avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
    email: 'dominic@radianos.com',
  };
  return (
    <div className="w-full bg-elevation-level1 px-6 py-2 flex items-center justify-between">
      <Link to="/">
        <img src="/navbar/logo.png" alt="logo" className="cursor-pointer" />
      </Link>
      <div className="flex items-center justify-center gap-6">
        <div>
          <ThemeToggler />
        </div>

        <div>Notifications</div>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Contact Details</div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <div className="font-medium">{profile.name}</div>
                <div className="text-fg-secondary">{profile.email}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Send Message</Button>
              <Button>Contact</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavbarMenu;
