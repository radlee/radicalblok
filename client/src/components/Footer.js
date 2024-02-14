import React from 'react'

function Footer() {
  return (

    <div className="max-w-2xl mx-auto text-center">

	<footer className="p-4 bg-white rounded-lg shadow items-center p-6">
		<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 - {new Date().getFullYear()} < span className="rad"> | rad</span><span className="blak">Blok | All Rights Reserved</span>
    </span>
	</footer>
</div>


  )
}

export default Footer