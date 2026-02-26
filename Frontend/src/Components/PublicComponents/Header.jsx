import { IconBell, IconSettings, IconShieldCheck } from "@tabler/icons-react";
import { Avatar, Indicator, Burger, Drawer, Stack, Divider, SegmentedControl, Text } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { User, getNavLinks } from "../../Data/User";
import NavLinks from "./NavLinks";
import BrandLogo, { BrandMark, BrandWordmark } from "./BrandLogo";

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = getNavLinks(User.role);

  const handleRoleChange = (value) => {
    localStorage.setItem("userRole", value);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-18 text-white flex items-center justify-between px-4 sm:px-6 lg:px-12 border-b border-mine-shaft-800 z-100 backdrop-blur-xl bg-mine-shaft-950/60 transition-all duration-300">

      {/* ── Left: Brand Logo ── */}
      <div className="flex-1 flex justify-start items-center py-2">
        <BrandLogo compact={true} />
      </div>

      {/* ── Center: Desktop Navigation ── */}
      <div className="hidden md:flex items-center justify-center h-full">
        <NavLinks />
      </div>

      {/* ── Right: Profile & Actions ── */}
      <div className="flex-1 flex items-center justify-end gap-2 lg:gap-4 py-3">

        {/* Role Switcher (Dev Mode) */}
        <div className="hidden lg:flex items-center gap-2 bg-mine-shaft-900/40 p-1 rounded-xl border border-mine-shaft-800">
          <SegmentedControl
            value={User.role}
            onChange={handleRoleChange}
            data={[
              { label: 'Candidate', value: 'CANDIDATE' },
              { label: 'Recruiter', value: 'RECRUITER' },
              { label: 'Admin', value: 'ADMIN' },
            ]}
            size="xs"
            radius="lg"
            classNames={{
              root: "bg-transparent! border-none!",
              control: "border-none!",
              label: "text-mine-shaft-400! font-black! uppercase! tracking-tighter! hover:text-white!",
              indicator: "bg-bright-sun-400! text-mine-shaft-950!"
            }}
          />
        </div>

        {/* Profile pill — desktop */}
        <div className="hidden sm:flex items-center gap-2 bg-mine-shaft-900/60 py-1.5 px-3 rounded-full border border-mine-shaft-800 hover:border-bright-sun-400/40 hover:bg-mine-shaft-800 transition-all cursor-pointer group">
          <Avatar
            src={User.avatar}
            alt="Profile"
            size="sm"
            radius="xl"
            className="border border-mine-shaft-700 group-hover:border-bright-sun-400/50 transition-all"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-0.5">Profile</span>
            <span className="text-[9px] text-mine-shaft-500 font-bold truncate max-w-[90px]">{User.name}</span>
          </div>
        </div>

        {/* Icon cluster */}
        <div className="flex items-center gap-1.5">
          <div className="hidden xs:flex items-center justify-center bg-mine-shaft-900 hover:bg-mine-shaft-800 p-2 rounded-xl text-mine-shaft-400 hover:text-bright-sun-400 cursor-pointer transition-all border border-mine-shaft-800 hover:border-bright-sun-400/30">
            <IconSettings stroke={1.5} size={18} />
          </div>
          <div className="flex items-center justify-center bg-mine-shaft-900 hover:bg-mine-shaft-800 p-2 rounded-xl text-mine-shaft-400 hover:text-bright-sun-400 cursor-pointer transition-all border border-mine-shaft-800 hover:border-bright-sun-400/30">
            <Indicator color="red" offset={3} size={7} processing>
              <IconBell stroke={1.5} size={18} />
            </Indicator>
          </div>
        </div>

        {/* Mobile burger */}
        <Burger
          opened={opened}
          onClick={toggle}
          className="md:hidden ml-2"
          size="sm"
          color="white"
        />
      </div>

      {/* ── Mobile Drawer ── */}
      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
        padding="xl"
        position="right"
        title={
          <div className="flex items-center gap-3">
            <BrandMark size={36} />
            <BrandWordmark size="small" />
          </div>
        }
        styles={{
          header: {
            backgroundColor: '#080808',
            borderBottom: '1px solid #1c1c1c',
            padding: '20px 24px',
          },
          content: {
            backgroundColor: '#080808',
            backgroundImage:
              'radial-gradient(ellipse at top right, rgba(250,230,45,0.04) 0%, transparent 60%)',
          },
          close: { color: '#6b7280' },
        }}
      >
        <Stack gap={0} mt="md">
          {links.map((link, idx) => (
            <Link
              key={link.url}
              to={link.url}
              onClick={close}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-black uppercase tracking-wider text-sm ${pathname === link.url
                ? 'text-bright-sun-400 bg-bright-sun-400/8'
                : 'text-mine-shaft-300 hover:text-bright-sun-400 hover:bg-mine-shaft-900/60'
                }`}
            >
              {/* Active indicator dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${pathname === link.url ? 'bg-bright-sun-400 shadow-[0_0_6px_rgba(250,230,45,0.8)]' : 'bg-mine-shaft-700'
                  }`}
              />
              {link.name}
              {pathname === link.url && (
                <span className="ml-auto text-[9px] font-black bg-bright-sun-400/15 text-bright-sun-400 px-2 py-0.5 rounded-full tracking-widest uppercase">
                  Active
                </span>
              )}
            </Link>
          ))}

          <Divider color="dark" my="xl" />

          {/* User profile row */}
          <div className="flex items-center gap-4 bg-mine-shaft-900/30 py-4 px-5 rounded-2xl border border-mine-shaft-800/60">
            <Avatar src={User.avatar} alt="Profile" size="md" radius="xl" />
            <div className="flex flex-col">
              <span className="text-white font-black text-sm tracking-tight">{User.name}</span>
              <span className="text-[11px] text-mine-shaft-500 font-bold">{User.email}</span>
            </div>
            <div className="ml-auto text-[9px] font-black bg-bright-sun-400 text-mine-shaft-950 px-2.5 py-1 rounded-full tracking-widest uppercase">
              {User.membership}
            </div>
          </div>

          {/* Brand trademark stamp at bottom */}
          <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
            <BrandMark size={20} />
            <span className="text-[9px] font-black text-mine-shaft-500 uppercase tracking-[0.3em]">
              Be On Board ™
            </span>
          </div>
        </Stack>
      </Drawer>
    </nav>
  );
};

export default Header;
