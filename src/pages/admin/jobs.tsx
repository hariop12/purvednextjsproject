import { useEffect, useState } from "react";
import { Models } from "appwrite";
import {
  databases,
  storage,
  DB_ID,
  JOB_APPLICATIONS_COLLECTION,
  JOB_CV_BUCKET_ID,
} from "../../lib/appwrite";

interface Job extends Models.Document {
  name: string;
  email: string;
  position: string;
  cvFileId: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    databases.listDocuments(DB_ID, JOB_APPLICATIONS_COLLECTION).then((res) => {
      const docs = res.documents.map((doc) => doc as unknown as Job);
      setJobs(docs);
    });
  }, []);

  return (
    <div>
      <h2>Job Applications</h2>
      {jobs.map((j) => (
        <div key={j.$id}>
          <p>{j.name}</p>
          <p>{j.email}</p>
          <p>{j.position}</p>
          <a
            href={storage.getFileView(JOB_CV_BUCKET_ID, j.cvFileId)}
            target="_blank"
            rel="noreferrer"
          >
            View CV
          </a>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
