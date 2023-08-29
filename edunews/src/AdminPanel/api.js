// api.js




// Function to update news by ID using PUT method
export const updateNews = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:4600/news`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

// Function to update edunews by ID using PUT method
export const updateEdunews = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:4600/edunews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating edunews:', error);
    throw error;
  }
};

// Function to update post by ID using PUT method
export const updatePosts = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:4600/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Function to delete news by ID using DELETE method
export const deleteNews = async (id) => {
  try {
    const response = await fetch(`http://localhost:4600/news?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};

// Function to delete edunews by ID using DELETE method
export const deleteEdunews = async (id) => {
  try {
    const response = await fetch(`http://localhost:4600/edunews?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting edunews:', error);
    throw error;
  }
};

// Function to delete post by ID using DELETE method
export const deletePosts = async (id) => {
  try {
    const response = await fetch(`http://localhost:4600/post?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

