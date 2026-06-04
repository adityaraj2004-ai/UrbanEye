
// INCIDENT SOCKET HANDLERS
// These handle events sent FROM frontend TO backend
// via socket (not HTTP)
//
// For MVP most communication is:
// Frontend → HTTP → Backend (creating/updating)
// Backend → Socket → Frontend (broadcasting)
//
// But we set up socket handlers for future features
// like joining incident rooms for live tracking
export const registerIncidentSocketHandlers = (io, socket) => {

    // JOIN INCIDENT ROOM
    // When user opens an incident detail page
    // They join that incident's room
    // So they get live updates for that specific incident
    socket.on("join_incident", (incidentId) => {
      socket.join(`incident_${incidentId}`);
      console.log(`Socket ${socket.id} joined incident room: ${incidentId}`);
    });
  
    // LEAVE INCIDENT ROOM
    // When user navigates away from incident detail page
    socket.on("leave_incident", (incidentId) => {
      socket.leave(`incident_${incidentId}`);
      console.log(`Socket ${socket.id} left incident room: ${incidentId}`);
    });
  
    // JOIN MAP AREA
    // When user opens the map page
    // They join a general map room
    // Gets all new incident broadcasts
    socket.on("join_map", () => {
      socket.join("map_viewers");
      console.log(`Socket ${socket.id} joined map viewers`);
    });
  
    socket.on("leave_map", () => {
      socket.leave("map_viewers");
      console.log(`Socket ${socket.id} left map viewers`);
    });
  };