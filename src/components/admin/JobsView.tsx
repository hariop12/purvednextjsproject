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
  name?: string;
  email: string;
  position?: string;
  cvFileId: string;
}

const JobsView = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    databases.listDocuments(DB_ID, JOB_APPLICATIONS_COLLECTION).then((res) => {
      setJobs(res.documents as unknown as Job[]);
    });
  }, []);

  return (
    <>
      <h2 className="admin-section-title">Job Applications</h2>

      <div className="admin-list">
        {jobs.map((j) => (
          <div className="admin-row" key={j.$id}>
            <div className="admin-row-left">
              <div className="admin-row-title">{j.name || "Applicant"}</div>
              <div className="admin-row-meta">{j.email}</div>

              {j.position && (
                <div className="admin-tag">Applied for {j.position}</div>
              )}
            </div>

            <a
              href={storage.getFileView(JOB_CV_BUCKET_ID, j.cvFileId)}
              target="_blank"
              rel="noreferrer"
              className="admin-btn"
            >
              View CV
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobsView;
