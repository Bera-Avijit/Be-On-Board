import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Avatar,
  Text,
  Button,
  TextInput,
  Textarea,
  SimpleGrid,
  Stack,
  Modal,
  Badge,
  ActionIcon,
  Divider,
  Select,
} from "@mantine/core";
import {
  IconUpload,
  IconDeviceFloppy,
  IconLock,
  IconCamera,
  IconPhotoEdit,
  IconCheckbox,
  IconPencil,
  IconX,
  IconPlus,
  IconBriefcase,
  IconCertificate,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../Data/User";
import { notifications } from "@mantine/notifications";

const LOGODEV_PK = import.meta.env.VITE_LOGODEV_PUBLISHABLE_KEY;

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: User.name || "Default User",
    role: "Senior Software Engineer",
    email: User.email || "user@example.com",
    phone: "5551234567",
    phonePrefix: "+91",
    location: "San Francisco, CA",
    about:
      "Passionate professional with experience in building scalable applications, leading cross-functional teams, and consistently delivering high-quality software solutions under tight deadlines.",
    skills: [
      "React",
      "Spring Boot",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
      "JavaScript",
    ],
    experiences: [
      {
        id: 1,
        title: "Senior Developer",
        company: "Google",
        location: "Mountain View, CA",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Led frontend architecture for enterprise solutions.",
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "Microsoft",
        location: "Redmond, WA",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        description: "Developed core microservices for Azure.",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon",
        date: "Aug 2023",
      },
    ],
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((c) => c.idd && c.idd.root)
          .map((c) => {
            const dialCode =
              c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "");
            return {
              value: c.cca2,
              label: `${c.flag || "🌐"} ${dialCode}`,
              name: c.name.common,
              dialCode: dialCode,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // State handles for Modals
  const [basicOpened, { open: openBasic, close: closeBasic }] =
    useDisclosure(false);
  const [aboutOpened, { open: openAbout, close: closeAbout }] =
    useDisclosure(false);
  const [expOpened, { open: openExp, close: closeExp }] = useDisclosure(false);
  const [certOpened, { open: openCert, close: closeCert }] =
    useDisclosure(false);

  // Form states
  const [basicForm, setBasicForm] = useState({
    name: profileData.name,
    role: profileData.role,
    email: profileData.email,
    phone: profileData.phone,
    phonePrefix: profileData.phonePrefix,
    location: profileData.location,
    company: "Google",
  });
  const [aboutForm, setAboutForm] = useState(profileData.about);
  const [skillInput, setSkillInput] = useState("");

  // New Experience/Cert form
  const [expForm, setExpForm] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [certForm, setCertForm] = useState({ name: "", issuer: "", date: "" });

  const notifyChange = (message) => {
    notifications.show({
      title: "Profile Updated",
      message: message,
      color: "yellow",
      autoClose: 3000,
    });
  };

  const handleSaveBasic = () => {
    setProfileData((prev) => ({
      ...prev,
      name: basicForm.name,
      role: basicForm.role,
      email: basicForm.email,
      phone: basicForm.phone,
      phonePrefix: basicForm.phonePrefix,
      location: basicForm.location,
    }));
    closeBasic();
    notifyChange("Personal details updated successfully.");
  };

  const handleSaveAbout = () => {
    setProfileData((prev) => ({ ...prev, about: aboutForm }));
    closeAbout();
    notifyChange("About section updated.");
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!profileData.skills.includes(skillInput.trim())) {
        const newSkills = [...profileData.skills, skillInput.trim()];
        setProfileData((prev) => ({ ...prev, skills: newSkills }));
        notifyChange("New skill added.");
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    notifyChange("Skill removed.");
  };

  const editExperience = (exp) => {
    setExpForm(exp);
    openExp();
  };

  const deleteExperience = (id) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
    notifyChange("Experience deleted.");
  };

  const saveExperience = () => {
    if (expForm.id) {
      setProfileData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((e) =>
          e.id === expForm.id ? expForm : e,
        ),
      }));
      notifyChange("Experience updated.");
    } else {
      setProfileData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...expForm, id: Date.now() }],
      }));
      notifyChange("Experience record added successfully.");
    }
    setExpForm({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    closeExp();
  };

  const editCertification = (cert) => {
    setCertForm(cert);
    openCert();
  };

  const deleteCertification = (id) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
    notifyChange("Certification deleted.");
  };

  const saveCertification = () => {
    if (certForm.id) {
      setProfileData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((c) =>
          c.id === certForm.id ? certForm : c,
        ),
      }));
      notifyChange("Certification updated.");
    } else {
      setProfileData((prev) => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          { ...certForm, id: Date.now() },
        ],
      }));
      notifyChange("Certification added successfully.");
    }
    setCertForm({ name: "", issuer: "", date: "" });
    closeCert();
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 py-10 px-4 sm:px-6">
      <Container size="lg" className="max-w-4xl">
        <div className="mb-8 pl-2">
          <Text className="!text-3xl !font-black !text-white !uppercase !tracking-tight !mb-2">
            Talent Profile Manager
          </Text>
          <Text className="!text-mine-shaft-300">
            Construct and edit your comprehensive resume data view.
          </Text>
        </div>

        <Stack gap="xl">
          {/* Banner & Basic Identity Section */}
          <Paper className="!bg-[#0c0c0c] !border !border-mine-shaft-800 !rounded-[2.5rem] sm:!rounded-[3rem] shadow-2xl overflow-hidden pt-0 relative pb-8">
            {/* Banner Background */}
            <div className="h-38 sm:h-45 w-full relative group cursor-pointer overflow-hidden bg-gradient-to-r from-mine-shaft-800 to-mine-shaft-900">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <Button
                  variant="light"
                  color="gray"
                  leftSection={<IconPhotoEdit size={18} />}
                  className="!bg-mine-shaft-900/80 hover:!bg-bright-sun-400 !text-white hover:!text-mine-shaft-950 !rounded-xl !font-bold !backdrop-blur-md !transition-all"
                >
                  Edit Cover Photo
                </Button>
              </div>
            </div>

            {/* Profile Info underneath relative to banner */}
            <div className="px-6 sm:px-10 relative -mt-16 sm:-mt-14 lg:-mt-12 flex flex-col sm:flex-row gap-6 sm:items-end justify-between">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-end w-full">
                {/* Avatar Overlay */}
                <div className="relative group cursor-pointer rounded-full shrink-0">
                  <Avatar
                    src={User.avatar}
                    size={150}
                    radius={150}
                    className="border-[6px] border-[#0c0c0c] group-hover:border-bright-sun-400 transition-all duration-300 shadow-xl bg-mine-shaft-900"
                  />
                  <div className="absolute inset-0 border-[6px] border-transparent rounded-full flex items-center justify-center pointer-events-none">
                    <div className="absolute inset-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 pointer-events-auto">
                      <IconCamera size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Identity Text */}
                <div className="flex-1 pb-2 pt-4 sm:pt-4 lg:pt-8">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Text className="text-3xl font-black text-white shrink-0 tracking-tight">
                        {profileData.name}
                      </Text>
                      <Text className="text-lg font-bold text-bright-sun-400 mb-2">
                        {profileData.role} {basicForm.company ? `at ${basicForm.company}` : ""}
                      </Text>
                      <div className="flex flex-wrap items-center gap-3 text-mine-shaft-400 font-semibold text-sm">
                        <span className="flex items-center gap-1.5">
                          <IconBriefcase
                            size={16}
                            className="text-mine-shaft-500"
                          />{" "}
                          {profileData.location}
                        </span>
                      </div>
                    </div>

                    <ActionIcon
                      size="xl"
                      radius="xl"
                      onClick={openBasic}
                      className="!bg-mine-shaft-900 hover:!bg-bright-sun-400 !text-mine-shaft-300 hover:!text-mine-shaft-950 !border !border-mine-shaft-800 transition-all shadow-md shrink-0 self-start sm:self-auto mt-4 sm:mt-0"
                    >
                      <IconPencil size={20} />
                    </ActionIcon>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-10 mt-6 flex gap-4">
              <Badge
                color="yellow"
                size="lg"
                className="!bg-bright-sun-400/10 !text-bright-sun-400 px-4 py-3 h-auto uppercase tracking-wider font-black rounded-lg border border-bright-sun-400/20"
              >
                {User.membership || "Standard Tier"}
              </Badge>
              <Badge
                color="green"
                size="lg"
                className="!bg-green-500/10 !text-green-400 px-4 py-3 h-auto uppercase tracking-wider font-black rounded-lg border border-green-500/20 flex items-center gap-2"
              >
                <IconCheckbox size={14} className="mr-1 inline" /> Verified
              </Badge>
            </div>
          </Paper>

          {/* About Section */}
          <Paper className="!bg-mine-shaft-900 !border !border-mine-shaft-800 p-6 sm:p-8 !rounded-[2.5rem] sm:!rounded-[3rem] shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="!flex !justify-between !items-center !mb-4">
              <Text className="!text-xl !font-bold !text-white">About Me</Text>
              <ActionIcon
                onClick={openAbout}
                variant="light"
                color="yellow"
                className="!bg-mine-shaft-800 hover:!bg-bright-sun-400 !text-mine-shaft-300 hover:!text-mine-shaft-950 transition-all rounded-full border border-mine-shaft-700"
              >
                <IconPencil size={18} />
              </ActionIcon>
            </div>
            <Text className="text-mine-shaft-300 leading-relaxed font-medium">
              {profileData.about}
            </Text>
          </Paper>

          {/* Skills Section */}
          <Paper className="!bg-mine-shaft-900 !border !border-mine-shaft-800 p-6 sm:p-8 !rounded-[2.5rem] sm:!rounded-[3rem] shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <Text className="!text-xl !font-bold !text-white !mb-6">
              Technical Skills
            </Text>

            <div className="w-full bg-[#111111] border border-mine-shaft-800 rounded-3xl p-4 min-h-[70px] flex flex-wrap gap-2.5 items-center focus-within:!border-bright-sun-400/50 transition-all shadow-inner">
              {profileData.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 !bg-bright-sun-400 !text-mine-shaft-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider group/tag shadow-sm transition-all hover:scale-[1.03]"
                >
                  {skill}
                  <IconX
                    size={14}
                    className="cursor-pointer text-mine-shaft-950/60 hover:text-mine-shaft-950 transition-colors ml-1"
                    onClick={() => removeSkill(skill)}
                  />
                </div>
              ))}
              <input
                type="text"
                placeholder={
                  profileData.skills.length === 0
                    ? "Type a skill and press Enter..."
                    : "Add skill..."
                }
                className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-white min-w-[150px] px-2 py-1 placeholder:text-mine-shaft-600"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
              />
            </div>
          </Paper>

          {/* Experience Section */}
          <Paper className="!bg-mine-shaft-900 !border !border-mine-shaft-800 p-6 sm:p-8 !rounded-[2.5rem] sm:!rounded-[3rem] shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex !justify-between !items-center !mb-8">
              <Text className="!text-xl !font-bold !text-white">
                Work Experience
              </Text>
              <Button
                onClick={() => {
                  setExpForm({
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  });
                  openExp();
                }}
                variant="outline"
                color="yellow"
                leftSection={<IconPlus size={16} />}
                className="!border-mine-shaft-700 !text-mine-shaft-300 hover:!bg-bright-sun-400 hover:!text-mine-shaft-950 hover:!border-bright-sun-400 rounded-xl transition-all h-8 text-xs font-bold uppercase tracking-widest"
              >
                Add Role
              </Button>
            </div>

            <div className="space-y-8">
              {profileData.experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {index !== profileData.experiences.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-[-32px] w-px bg-mine-shaft-800"></div>
                  )}
                  <div className="flex gap-6">
                    <div className="w-16 h-16 !rounded-3xl bg-white border-2 border-mine-shaft-800 p-2 shrink-0 shadow-lg relative z-10">
                      <img
                        src={`https://img.logo.dev/${exp.company.toLowerCase().replace(/\s/g, "")}.com?token=${LOGODEV_PK}`}
                        alt={exp.company}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=FA9E0D&color=fff&bold=true`;
                        }}
                      />
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Text className="text-lg font-bold text-white leading-tight">
                            {exp.title}
                          </Text>
                          <Text className="text-sm font-black uppercase tracking-wider text-bright-sun-400 mb-1">
                            {exp.company}
                          </Text>
                        </div>
                        <div className="flex gap-2">
                          <ActionIcon
                            onClick={() => editExperience(exp)}
                            variant="subtle"
                            color="yellow"
                            className="hover:!bg-mine-shaft-800 text-mine-shaft-400 hover:!text-bright-sun-400 transition-colors border border-transparent hover:border-mine-shaft-700"
                          >
                            <IconPencil size={18} />
                          </ActionIcon>
                          <ActionIcon
                            onClick={() => deleteExperience(exp.id)}
                            variant="subtle"
                            color="red"
                            className="hover:!bg-mine-shaft-800 text-mine-shaft-400 hover:!text-red-400 transition-colors border border-transparent hover:border-mine-shaft-700"
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </div>
                      </div>
                      <Text className="text-xs text-mine-shaft-500 font-bold mb-3">
                        {exp.startDate} - {exp.endDate} • {exp.location}
                      </Text>
                      <Text className="text-sm text-mine-shaft-300 font-medium leading-relaxed">
                        {exp.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Paper>

          {/* Certifications Section */}
          <Paper className="!bg-mine-shaft-900 !border !border-mine-shaft-800 p-6 sm:p-8 !rounded-[2.5rem] sm:!rounded-[3rem] shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex !justify-between !items-center !mb-8">
              <Text className="!text-xl !font-bold !text-white">
                Certifications
              </Text>
              <Button
                onClick={() => {
                  setCertForm({ name: "", issuer: "", date: "" });
                  openCert();
                }}
                variant="outline"
                color="yellow"
                leftSection={<IconPlus size={16} />}
                className="!border-mine-shaft-700 !text-mine-shaft-300 hover:!bg-bright-sun-400 hover:!text-mine-shaft-950 hover:!border-bright-sun-400 rounded-xl transition-all h-8 text-xs font-bold uppercase tracking-widest"
              >
                Add Cert
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileData.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex gap-4 p-4 !rounded-2xl border border-mine-shaft-800 bg-[#111111] hover:border-bright-sun-400/40 transition-colors group relative"
                >
                  <div className="w-12 h-12 !rounded-2xl bg-mine-shaft-800 flex items-center justify-center shrink-0">
                    <img
                      src={`https://img.logo.dev/${cert.issuer.toLowerCase().replace(/\s/g, "")}.com?token=${LOGODEV_PK}`}
                      alt={cert.issuer}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.src = `https://cdn-icons-png.flaticon.com/512/732/732221.png`;
                      }}
                    />
                  </div>
                  <div className="flex-1 pr-10">
                    <Text className="text-sm font-bold text-white group-hover:text-bright-sun-400 transition-colors leading-tight mb-1">
                      {cert.name}
                    </Text>
                    <Text className="text-[11px] font-black uppercase tracking-widest text-mine-shaft-500">
                      {cert.issuer}
                    </Text>
                    <Text className="text-[10px] text-mine-shaft-600 font-bold">
                      {cert.date}
                    </Text>
                  </div>
                  <div className="absolute right-4 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ActionIcon
                      onClick={() => editCertification(cert)}
                      size="sm"
                      variant="subtle"
                      color="yellow"
                      className="hover:!bg-mine-shaft-800 text-mine-shaft-400 hover:!text-bright-sun-400 transition-colors border border-transparent hover:border-mine-shaft-700"
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => deleteCertification(cert.id)}
                      size="sm"
                      variant="subtle"
                      color="red"
                      className="hover:!bg-mine-shaft-800 text-mine-shaft-400 hover:!text-red-400 transition-colors border border-transparent hover:border-mine-shaft-700"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </Stack>

        {/* Basic Info Modal */}
        <Modal
          opened={basicOpened}
          onClose={closeBasic}
          title={
            <Text className="!text-xl !font-bold !text-white">
              Edit Personal Details
            </Text>
          }
          centered
          classNames={{
            content:
              "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:display-none [scrollbar-width:none] [-ms-overflow-style:none]",
            header:
              "!bg-mine-shaft-900 !static !border-b !border-mine-shaft-800 pb-4 mb-4",
            close:
              "hover:!bg-mine-shaft-800 !text-mine-shaft-400 hover:!text-bright-sun-400",
            body: "!p-6 !pt-0",
          }}
          scrollAreaComponent="div"
        >
          <Stack gap="sm">
            <TextInput
              label="Full Name"
              value={basicForm.name}
              onChange={(e) =>
                setBasicForm({ ...basicForm, name: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />
            <TextInput
              label="Current Role"
              placeholder="e.g. Software Engineer"
              value={basicForm.role}
              onChange={(e) =>
                setBasicForm({ ...basicForm, role: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />
            <TextInput
              label="Email Address"
              value={basicForm.email}
              onChange={(e) =>
                setBasicForm({ ...basicForm, email: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />
            <TextInput
              label="Phone Number"
              placeholder="10-digit number"
              value={basicForm.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setBasicForm({ ...basicForm, phone: val });
              }}
              leftSection={
                <Select
                  value={
                    countries.find((c) => c.dialCode === basicForm.phonePrefix)
                      ?.value || "IN"
                  }
                  onChange={(val) => {
                    const country = countries.find((c) => c.value === val);
                    if (country) {
                      setBasicForm({
                        ...basicForm,
                        phonePrefix: country.dialCode,
                      });
                    }
                  }}
                  data={countries}
                  searchable
                  placeholder="Search"
                  variant="unstyled"
                  allowDeselect={false}
                  rightSection={null}
                  classNames={{
                    input:
                      "!text-white !font-bold !text-[11px] w-[92px] !pl-2 !pr-2 !min-h-0 h-full flex items-center justify-center cursor-pointer",
                    dropdown:
                      "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-xl !shadow-2xl",
                    option:
                      "hover:!bg-mine-shaft-800 !text-white !text-xs !py-3 !px-4 transition-colors",
                    optionsList:
                      "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-mine-shaft-700 [&::-webkit-scrollbar-thumb]:rounded-full",
                    search:
                      "!bg-mine-shaft-950 !text-white !border-mine-shaft-800 focus:!border-bright-sun-400 !rounded-lg !mb-2 !mx-2 !w-[calc(100%-16px)]",
                  }}
                  comboboxProps={{
                    transitionProps: { transition: "pop-top-left", duration: 200 },
                    shadow: "xl",
                    width: 250,
                    position: "bottom-start",
                    withinPortal: true,
                  }}
                />
              }
              leftSectionWidth={92}
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11 !pl-[100px]",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />
            <TextInput
              label="Location"
              value={basicForm.location}
              onChange={(e) =>
                setBasicForm({ ...basicForm, location: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />
            <TextInput
              label="Preferred Company"
              value={basicForm.company}
              onChange={(e) =>
                setBasicForm({ ...basicForm, company: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400 h-11",
                label: "!text-mine-shaft-300 font-bold mb-1.5",
              }}
            />

            <Button
              onClick={handleSaveBasic}
              className="!bg-bright-sun-400 !text-mine-shaft-950 hover:!bg-bright-sun-500 rounded-xl font-bold mt-2 h-10"
            >
              Save Changes
            </Button>
          </Stack>
        </Modal>

        {/* About Modal */}
        <Modal
          opened={aboutOpened}
          onClose={closeAbout}
          title={
            <Text className="!text-xl !font-bold !text-white">Edit About Me</Text>
          }
          centered
          size="lg"
          classNames={{
            content:
              "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:display-none [scrollbar-width:none] [-ms-overflow-style:none]",
            header:
              "!bg-mine-shaft-900 !static !border-b !border-mine-shaft-800 pb-4 mb-4",
            close:
              "hover:!bg-mine-shaft-800 !text-mine-shaft-400 hover:!text-bright-sun-400",
            body: "!p-6 !pt-0",
          }}
          scrollAreaComponent="div"
        >
          <Stack gap="md">
            <Textarea
              autosize
              minRows={5}
              value={aboutForm}
              onChange={(e) => setAboutForm(e.target.value)}
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <Button
              onClick={handleSaveAbout}
              className="!bg-bright-sun-400 !text-mine-shaft-950 hover:!bg-bright-sun-500 rounded-xl font-bold mt-2"
            >
              Update Bio
            </Button>
          </Stack>
        </Modal>

        {/* Experience Modal */}
        <Modal
          opened={expOpened}
          onClose={closeExp}
          title={
            <Text className="!text-xl !font-bold !text-white">
              {expForm.id ? "Edit Experience" : "Add Experience"}
            </Text>
          }
          centered
          size="lg"
          classNames={{
            content:
              "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:display-none [scrollbar-width:none] [-ms-overflow-style:none]",
            header:
              "!bg-mine-shaft-900 !static !border-b !border-mine-shaft-800 pb-4 mb-4",
            close:
              "hover:!bg-mine-shaft-800 !text-mine-shaft-400 hover:!text-bright-sun-400",
            body: "!p-6 !pt-0",
          }}
          scrollAreaComponent="div"
        >
          <Stack gap="md">
            <TextInput
              label="Company"
              placeholder="e.g. Google"
              value={expForm.company}
              onChange={(e) =>
                setExpForm({ ...expForm, company: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <TextInput
              label="Job Title"
              placeholder="e.g. Senior Software Engineer"
              value={expForm.title}
              onChange={(e) =>
                setExpForm({ ...expForm, title: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <SimpleGrid cols={2}>
              <TextInput
                label="Start Date"
                placeholder="e.g. Jan 2020"
                value={expForm.startDate}
                onChange={(e) =>
                  setExpForm({ ...expForm, startDate: e.target.value })
                }
                classNames={{
                  input:
                    "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                  label: "!text-mine-shaft-300 font-bold mb-1",
                }}
              />
              <TextInput
                label="End Date"
                placeholder="e.g. Present"
                value={expForm.endDate}
                onChange={(e) =>
                  setExpForm({ ...expForm, endDate: e.target.value })
                }
                classNames={{
                  input:
                    "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                  label: "!text-mine-shaft-300 font-bold mb-1",
                }}
              />
            </SimpleGrid>
            <TextInput
              label="Location"
              placeholder="e.g. San Francisco, CA"
              value={expForm.location}
              onChange={(e) =>
                setExpForm({ ...expForm, location: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <Textarea
              autosize
              label="Description"
              placeholder="What did you do there?"
              minRows={3}
              value={expForm.description}
              onChange={(e) =>
                setExpForm({ ...expForm, description: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <Button
              onClick={saveExperience}
              className="!bg-bright-sun-400 !text-mine-shaft-950 hover:!bg-bright-sun-500 rounded-xl font-bold mt-2"
            >
              {expForm.id ? "Update Role" : "Publish Role"}
            </Button>
          </Stack>
        </Modal>

        {/* Certification Modal */}
        <Modal
          opened={certOpened}
          onClose={closeCert}
          title={
            <Text className="!text-xl !font-bold !text-white">
              {certForm.id ? "Edit Certification" : "Add Certification"}
            </Text>
          }
          centered
          classNames={{
            content:
              "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:display-none [scrollbar-width:none] [-ms-overflow-style:none]",
            header:
              "!bg-mine-shaft-900 !static !border-b !border-mine-shaft-800 pb-4 mb-4",
            close:
              "hover:!bg-mine-shaft-800 !text-mine-shaft-400 hover:!text-bright-sun-400",
            body: "!p-6 !pt-0",
          }}
          scrollAreaComponent="div"
        >
          <Stack gap="md">
            <TextInput
              label="Certification Name"
              placeholder="e.g. AWS Solutions Architect"
              value={certForm.name}
              onChange={(e) =>
                setCertForm({ ...certForm, name: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <TextInput
              label="Issuing Organization"
              placeholder="e.g. Amazon Web Services"
              value={certForm.issuer}
              onChange={(e) =>
                setCertForm({ ...certForm, issuer: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <TextInput
              label="Date Acquired"
              placeholder="e.g. Aug 2023"
              value={certForm.date}
              onChange={(e) =>
                setCertForm({ ...certForm, date: e.target.value })
              }
              classNames={{
                input:
                  "!bg-mine-shaft-950 !border !border-mine-shaft-800 !text-white focus:!border-bright-sun-400",
                label: "!text-mine-shaft-300 font-bold mb-1",
              }}
            />
            <Button
              onClick={saveCertification}
              className="!bg-bright-sun-400 !text-mine-shaft-950 hover:!bg-bright-sun-500 rounded-xl font-bold mt-2"
            >
              {certForm.id ? "Update Certification" : "Save Certification"}
            </Button>
          </Stack>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfilePage;
