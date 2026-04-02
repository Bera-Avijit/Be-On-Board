import React, { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Text,
  FileInput,
  NumberInput,
  Divider,
  Notification,
  rem,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconUpload,
  IconUser,
  IconMail,
  IconPhone,
  IconBrandLinkedin,
  IconWorld,
  IconBriefcase,
  IconCurrencyDollar,
  IconCheck,
  IconX,
  IconFileText,
} from "@tabler/icons-react";
import {
  addApplication,
  getApplicationById,
  updateApplicationDetails,
} from "../../Data/ApplicationData";

const ApplicationForm = ({ jobId, jobTitle, company, appId = null }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
    )
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

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "avijit@example.com", // Mocked logged-in user from Header.jsx
      phone: "",
      linkedin: "",
      portfolio: "",
      experience: 0,
      expectedSalary: "",
      resume: null,
      coverLetter: "",
    },

    validate: {
      fullName: (value) =>
        value?.length < 2 ? "Name should have at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid phone number (10 digits)",
      resume: (value) => (appId ? null : value ? null : "Resume is required"), // Not strictly requiring if edit
      experience: (value) =>
        value < 0 ? "Experience cannot be negative" : null,
    },
  });

  useEffect(() => {
    if (appId) {
      const data = getApplicationById(appId);
      if (data) {
        form.setValues({
          fullName: data.fullName || "",
          email: data.email || "avijit@example.com",
          phone: data.phone || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
          experience: data.experience || 0,
          expectedSalary: data.expectedSalary || "",
          coverLetter: data.coverLetter || "",
          resume: null, // Keep resume empty unless re-uploaded
        });
      }
    }
  }, [appId]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const payload = {
      ...values,
      jobId,
      jobTitle,
      company,
      phone: `${phonePrefix} ${values.phone}`,
      resume: values.resume ? values.resume.name : appId ? null : null,
    };

    setTimeout(() => {
      if (appId) {
        if (!values.resume) delete payload.resume;
        updateApplicationDetails(appId, payload);
      } else {
        addApplication(payload);
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500); // Realistic backend delay
  };

  if (submitted) {
    return (
      <Box className="bg-mine-shaft-900/40! border! border-bright-sun-400/30! p-12! rounded-[2.5rem]! text-center! max-w-2xl! mx-auto! shadow-2xl! backdrop-blur-md!">
        <div className="w-20! h-20! bg-bright-sun-400! rounded-full! flex! items-center! justify-center! mx-auto! mb-6! shadow-lg! shadow-bright-sun-400/20!">
          <IconCheck size={40} className="text-mine-shaft-950!" />
        </div>
        <Text
          size="2xl"
          fw={900}
          className="text-white! mb-2! uppercase! tracking-tighter!"
        >
          Application {appId ? "Updated" : "Submitted"}!
        </Text>
        <Text size="sm" className="text-mine-shaft-300! font-medium! mb-8!">
          Your application for{" "}
          <span className="text-bright-sun-400!">{jobTitle}</span> at{" "}
          <span className="text-bright-sun-400!">{company}</span> has been{" "}
          {appId ? "updated" : "sent"} successfully.
        </Text>
        <Button
          variant="light"
          color="yellow"
          radius="xl"
          size="lg"
          onClick={() => (window.location.href = "/applications")} // Redirect to dash after edit
          className="bg-bright-sun-400/10! text-bright-sun-400! hover:bg-bright-sun-400/20! border! border-bright-sun-400/20! font-black! px-10!"
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box className="bg-mine-shaft-900/20! border! border-mine-shaft-800! rounded-[2.5rem]! p-8! lg:p-10! shadow-2xl! backdrop-blur-sm!">
      <div className="flex! gap-4! mb-10!">
        <div className="w-1.5! bg-bright-sun-400! rounded-full! self-stretch!"></div>
        <div>
          <Text
            size="3xl"
            fw={800}
            className="text-white! uppercase! mb-1! flex! items-center! gap-2!"
          >
            Apply for{" "}
            <span className="text-bright-sun-400! tracking-wide!">
              {" "}
              {jobTitle}
            </span>
          </Text>
          <Text
            size="xs"
            className="text-mine-shaft-400! font-bold! uppercase! tracking-[0.2em]!"
          >
            at <span className="text-bright-sun-400! ml-1!">{company}</span>
          </Text>
        </div>
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Full Name"
            withAsterisk
            placeholder="Enter your full name"
            leftSection={<IconUser size={18} className="text-bright-sun-400" />}
            {...form.getInputProps("fullName")}
            classNames={{
              label:
                "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
              input:
                "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
            }}
          />

          <TextInput
            label="Email Address"
            withAsterisk
            placeholder="your@email.com"
            disabled
            leftSection={<IconMail size={18} className="text-mine-shaft-500" />}
            {...form.getInputProps("email")}
            classNames={{
              label:
                "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
              input:
                "bg-mine-shaft-800/30! border-mine-shaft-800! text-mine-shaft-500! rounded-xl! h-12! font-medium! cursor-not-allowed! placeholder:text-mine-shaft-400!",
            }}
          />

          <TextInput
            label="Phone Number"
            withAsterisk
            placeholder="10 digit mobile number"
            leftSection={
              <Select
                value={
                  countries.find((c) => c.dialCode === phonePrefix)?.value ||
                  "IN"
                }
                onChange={(val) => {
                  const country = countries.find((c) => c.value === val);
                  if (country) {
                    setPhonePrefix(country.dialCode);
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
                    "!text-white !font-bold !text-[10px] w-[92px] !pl-2 !pr-2 !min-h-0 h-full flex items-center justify-center cursor-pointer",
                  dropdown:
                    "!bg-mine-shaft-900 !border !border-mine-shaft-800 !rounded-xl !shadow-2xl",
                  option:
                    "hover:!bg-mine-shaft-800 !text-white !text-xs !py-3 !px-4 transition-colors",
                  optionsList:
                    "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-mine-shaft-700 [&::-webkit-scrollbar-thumb]:rounded-full",
                  search:
                    "!bg-mine-shaft-950 !text-white !border-mine-shaft-800 focus:!border-bright-sun-400 !rounded-lg !mb-2 !mx-2 !w-[calc(100%-12px)]",
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
            {...form.getInputProps("phone")}
            classNames={{
              label:
                "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
              input:
                "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400! !pl-[100px]",
            }}
          />

          <TextInput
            label="LinkedIn Profile"
            placeholder="linkedin.com/in/username"
            leftSection={
              <IconBrandLinkedin size={18} className="text-bright-sun-400" />
            }
            {...form.getInputProps("linkedin")}
            classNames={{
              label:
                "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
              input:
                "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
            }}
          />

          <TextInput
            label="Portfolio / Website"
            placeholder="https://yourportfolio.com"
            leftSection={
              <IconWorld size={18} className="text-bright-sun-400" />
            }
            {...form.getInputProps("portfolio")}
            classNames={{
              label:
                "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
              input:
                "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Years of Experience"
              placeholder="Ex: 5"
              min={0}
              leftSection={
                <IconBriefcase size={18} className="text-bright-sun-400" />
              }
              {...form.getInputProps("experience")}
              classNames={{
                label:
                  "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
                input:
                  "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
                control: "border-mine-shaft-700!",
              }}
            />

            <TextInput
              label="Expected Salary"
              placeholder="Ex: 25 LPA"
              leftSection={
                <IconCurrencyDollar size={18} className="text-bright-sun-400" />
              }
              {...form.getInputProps("expectedSalary")}
              classNames={{
                label:
                  "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
                input:
                  "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
              }}
            />
          </div>
        </div>

        <Divider className="border-mine-shaft-800! my-10!" />

        <FileInput
          label="Attach Resume (PDF)"
          withAsterisk={!appId}
          placeholder={
            appId && getApplicationById(appId)?.resume
              ? `Update existing: ${getApplicationById(appId).resume}`
              : "Upload your resume"
          }
          accept="application/pdf"
          leftSection={<IconUpload size={18} className="text-bright-sun-400" />}
          {...form.getInputProps("resume")}
          className="mb-8!"
          description={
            appId && getApplicationById(appId)?.resume ? (
              <Group gap="xs" mt="xs">
                <IconFileText size={14} className="text-bright-sun-400" />
                <Text
                  size="xs"
                  className="text-mine-shaft-300 font-bold italic"
                >
                  Current file: {getApplicationById(appId).resume}
                </Text>
              </Group>
            ) : null
          }
          classNames={{
            label:
              "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
            input:
              "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! h-12! font-medium! placeholder:text-mine-shaft-400!",
          }}
        />

        <Textarea
          label="Cover Letter"
          placeholder="Tell us why you're a good fit for this role..."
          autosize
          minRows={4}
          leftSection={
            <IconFileText size={18} className="text-bright-sun-400" />
          }
          leftSectionProps={{
            style: { alignItems: "flex-start", marginTop: "12px" },
          }}
          {...form.getInputProps("coverLetter")}
          className="mb-10!"
          classNames={{
            label:
              "text-mine-shaft-200! font-bold! mb-2! uppercase! text-[10px]! tracking-widest!",
            input:
              "bg-mine-shaft-900/50! border-mine-shaft-700! text-white! rounded-xl! focus:border-bright-sun-400! transition-all! pl-12! pt-3! font-medium! placeholder:text-mine-shaft-400!",
          }}
        />

        <Group justify="flex-end">
          <Button
            type="submit"
            size="lg"
            radius="xl"
            color="yellow"
            loading={isSubmitting}
            loaderProps={{ type: "dots" }}
            className="bg-bright-sun-400! text-mine-shaft-950! hover:bg-bright-sun-500! font-black px-12 uppercase tracking-tighter"
          >
            {appId ? "Update Application" : "Submit Application"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ApplicationForm;
