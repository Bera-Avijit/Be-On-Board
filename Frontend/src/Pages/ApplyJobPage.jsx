import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Text, Group, Button, Container, Loader } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import ApplicationForm from "../Components/ApplyJob/ApplicationForm";
import { JOBS_DATA } from "../Data/JobsData";

const ApplyJobPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("appId");
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        // Try backend first
        const res = await fetch(`http://localhost:8080/api/jobs/${id}`);
        if (res.ok) {
          const j = await res.json();
          const mapped = {
            id: j.id,
            jobTitle: j.title || "Untitled Role",
            company: j.companyName || "Unknown Company",
          };
          setJob(mapped);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Backend fetch failed in Apply page, checking local:", err);
      }

      // Fallback to local
      const publishedJobs = JSON.parse(
        localStorage.getItem("publishedJobs") || "[]",
      );
      const allJobs = [...publishedJobs, ...JOBS_DATA];
      const foundJob = allJobs.find((j) => String(j.id) === String(id));
      setJob(foundJob);
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-mine-shaft-950 flex items-center justify-center">
        <Loader color="yellow" size="xl" type="bars" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-mine-shaft-950 flex flex-col items-center justify-center p-6 text-center">
        <Text size="xl" fw={900} color="white">
          Job listing not found
        </Text>
        <Button
          onClick={() => navigate("/find-jobs")}
          variant="light"
          color="yellow"
          mt="md"
          radius="xl"
        >
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] pb-20 pt-5">
      <Container size="lg">
        <Button
          onClick={() => navigate(-1)}
          variant="subtle"
          color="yellow"
          leftSection={<IconArrowLeft size={18} />}
          className="mb-8 font-bold hover:bg-mine-shaft-900"
        >
          Go Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
          <ApplicationForm
            jobId={job.id}
            jobTitle={job.jobTitle}
            company={job.company}
            appId={appId}
          />
        </div>
      </Container>
    </div>
  );
};

export default ApplyJobPage;
