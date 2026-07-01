import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseService";

const PROJECTS_COLLECTION = "projects";

export async function getProjects(userId) {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const projects = snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));

  return projects.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

export async function saveProject(project, userId) {
  const newProject = {
    ...project,
    userId,
    favorite: false,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), newProject);

  return {
    id: docRef.id,
    ...newProject,
  };
}

export async function updateProject(updatedProject) {
  const projectRef = doc(db, PROJECTS_COLLECTION, updatedProject.id);
  await updateDoc(projectRef, updatedProject);
  return updatedProject;
}

export async function toggleFavorite(project) {
  const projectRef = doc(db, PROJECTS_COLLECTION, project.id);

  await updateDoc(projectRef, {
    favorite: !project.favorite,
  });
}

export async function deleteProject(id) {
  const projectRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(projectRef);
}