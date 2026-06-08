import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { incidentApi } from "../api/incident.api.js";

// -------------------------------------------------------
// GET ALL INCIDENTS
// params → filters like category, severity, page etc
// -------------------------------------------------------
export const useIncidents = (params = {}) => {
  return useQuery({
    queryKey: ["incidents", params], // cache key — different params = different cache
    queryFn: () => incidentApi.getAll(params),
    select: (data) => data.data, // extract data from ApiResponse wrapper
  });
};

// -------------------------------------------------------
// GET SINGLE INCIDENT
// -------------------------------------------------------
export const useIncident = (id) => {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => incidentApi.getById(id),
    select: (data) => data.data.incident,
    enabled: !!id, // only run if id exists
  });
};

// -------------------------------------------------------
// GET MY INCIDENTS
// -------------------------------------------------------
export const useMyIncidents = (params = {}) => {
  return useQuery({
    queryKey: ["my-incidents", params],
    queryFn: () => incidentApi.getMyIncidents(params),
    select: (data) => data.data,
  });
};

// -------------------------------------------------------
// GET NEARBY INCIDENTS
// -------------------------------------------------------
export const useNearbyIncidents = (params) => {
  return useQuery({
    queryKey: ["nearby-incidents", params],
    queryFn: () => incidentApi.getNearby(params),
    select: (data) => data.data.incidents,
    // Only run if we have coordinates
    enabled: !!params?.latitude && !!params?.longitude,
  });
};

// -------------------------------------------------------
// CREATE INCIDENT MUTATION
// -------------------------------------------------------
export const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => incidentApi.create(formData),
    onSuccess: () => {
      // Invalidate incidents cache so list refreshes
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["my-incidents"] });
    },
  });
};

// -------------------------------------------------------
// TOGGLE UPVOTE MUTATION
// -------------------------------------------------------
export const useToggleUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => incidentApi.toggleUpvote(id),
    onSuccess: (_, id) => {
      // Refresh this specific incident's data
      queryClient.invalidateQueries({ queryKey: ["incident", id] });
    },
  });
};

// -------------------------------------------------------
// DELETE INCIDENT MUTATION
// -------------------------------------------------------
export const useDeleteIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => incidentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["my-incidents"] });
    },
  });
};