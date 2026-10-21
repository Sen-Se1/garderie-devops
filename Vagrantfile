Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"
  config.vm.hostname = "garderie-ubuntu"

  config.vm.synced_folder ".", "/vagrant"

  config.vm.network "private_network", ip: "192.168.56.10"

  config.vm.provider "libvirt" do |lv|
    lv.memory = 2048
    lv.cpus = 2
  end

  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "ansible/site.yml"
    ansible.inventory_path = "ansible/inventory/hosts.ini"
    ansible.config_file = "ansible/ansible.cfg"
    ansible.limit = "all"
    ansible.install = true
  end
end