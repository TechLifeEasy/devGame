
function User() {
    return (
      <div class="shadow-lg rounded-2xl w-64  text-black  dark:bg-gray-800 p-4 bg-black hover:text-yellow-500 border-2 hover:border-yellow-500 hover:translate-y-2 duration-500 ease-in-out cursor-pointer">
        <img
          alt="profil"
          src="https://images.unsplash.com/photo-1581147543324-6a0a08a48ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="rounded-t-lg h-28 w-full mb-4"
        />
        <div class="flex flex-col items-center justify-center p-4 -mt-16">
          <a class="block relative">
            <img
              alt="profil"
              src="https://zeelcodder.tech/images/home/zeel.jpeg"
              class="mx-auto object-cover rounded-full h-16 w-16 "
            />
          </a>
          <p class=" text-xl font-medium mt-2 text-yellow-500">zeel</p>
        </div>
      </div>
    );
  }

  
export default User;