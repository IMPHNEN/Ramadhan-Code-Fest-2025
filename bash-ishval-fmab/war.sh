#!/bin/bash
clear

RED='\033[0;31m'
GREEN='\033[0;32m'
WHITE='\033[0;37m'
YELLOW='\033[0;33m'
CYAN='\033[1;36m'
NC='\033[0m'

echo -e "${GREEN}Ishvalan region detected.${NC}"
sleep 2 # Kasih delay biar bagus

# Bikin persentase progress
printf "${YELLOW}Scanning...${NC} [  0%% ]"
for i in $(seq 1 100); do
    printf "\r${YELLOW}Scanning...${NC} [ %3d%% ]" "$i"
    sleep 0.02
done
printf "\n${WHITE}100.000${NC} ${GREEN}Ishvalan detected.${NC}\n"
sleep 2

# King Bradley nyuruh
echo -e "${RED}King Bradley has launched the War of Extermination on Ishvalan!${NC}"
sleep 2

# Bawahannya dimasukkin /etc/sudoers
echo -e "${GREEN}Superuser privilege acquired.${NC}"
sleep 1

# Persentase proggress tapi ada stutteringnya, biar kayak ngehapus file beneran
printf "${YELLOW}Executing:${NC} ${CYAN}sudo rm -rf Ishvalan${NC} [  0%% ]"
progress=0
while [ "$progress" -lt 100 ]; do
    delay=$(awk -v min=0.1 -v max=0.5 'BEGIN{srand(); print min+rand()*(max-min)}')
    jump=$(awk -v min=1 -v max=5 'BEGIN{srand(); print int(min+rand()*(max-min+1))}')

    progress=$((progress + jump))
    if [ "$progress" -gt 100 ]; then progress=100; fi

    printf "\r${YELLOW}Executing:${NC} ${CYAN}sudo rm -rf Ishvalan${NC} [ %3d%% ]" "$progress"
    sleep "$delay"
done
printf "\n"
sleep 2

echo -e "${YELLOW}Processing human sacrifices...${NC}"
sleep 3
echo -e "${YELLOW}Creating Philosopher's Stone...${NC}"
sleep 2

echo -e "${GREEN}Philosopher's Stone has been created.${NC}"

echo -e "${RED}"
cat << "EOF"
      .     .
   .  |     |  .
  | ~ .:::::. ~ |
  |  :::::::::  |
  |  :::::::::  |
  |  ':::::::'  |
  |    ':::'    |
   .     '     .
    ' - ._. - '
EOF
echo -e "${NC}"

# Mwnulis ulang sejarah
echo -e "\033[1;33mDo you want to rewrite the history? [Y/n]\033[0m"
read -r choice

if [[ -z "$choice" || "$choice" =~ ^[Yy]$ ]]; then
    clear
    # Propaganda pemerintah
    echo -e "\033[1;31m   Konflik Rakyat Ishval: Resolusi yang Diperlukan \033[0m"
    sleep 2

    echo -e "\n\033[1;37mSelama bertahun-tahun, wilayah Ishval sering didapati pemberontakan yang menolak persatuan. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mMeski dengan segala usaha pemerintah Amestris untuk menjaga kedamaian, ekstrimis di Ishval tetap bersikukuh hingga memicu pembangkangan. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mMembuntuti kasus pembunuhan seorang prajurit militer, pemerintah tidak punya pilihan lain selain bersikap tegas. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mDemi menjaga stabilitas dan keamanan Amestris, militer dengan cepat dikerahkan. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mUpaya yang berani dari kami akhirnya berhasil menjaga ketertiban dan menjamin perdamaian pada masa generasi mendatang. \033[0m"
    sleep 3

    echo -e "\n\033[1;32mAmestris yang kuat adalah Amestris yang bersatu. \033[0m"
    sleep 3
    exit 0
# Cape njir :)
elif [[ "$choice" =~ ^[Nn]$ ]]; then
    clear
    # POV Roy Mustang
    echo -e "\033[1;34m   Laporan Kolonel Roy Mustang \033[0m"
    sleep 2

    echo -e "\n\033[1;37mPerang rakyat Ishval adalah sebuah tragedi. \033[0m"
    sleep 2
    echo -e "\n\033[1;37mSebuah tragedi yang diperlukan, kata mereka. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mKami adalah prajurit, \033[0m"
    sleep 2
    echo -e "\n\033[1;37mbukanlah eksekutor... \033[0m"
    sleep 2
    echo -e "\n\033[1;37mTapi perintah itu mutlak. \033[0m"
    sleep 3
    
    echo -e "\n\033[1;37mKami membakar, menghancurkan, dan membunuh, \033[0m"
    sleep 2
    echo -e "\n\033[1;37mbukan sebagai pahlawan, bukan juga sebagai State Alchemists, \033[0m"
    sleep 3
    echo -e "\n\033[1;37mtapi sebagai senjata! \033[0m"
    sleep 3

    echo -e "\n\033[1;37mKami bilang ke diri kami sendiri bahwa ini dilakukan untuk kedamaiam Amestris. \033[0m"
    sleep 3
    echo -e "\n\033[1;37mTapi bahkan kedamaian membutuhkan pengorbanan. \033[0m"
    sleep 3

    echo -e "\n\033[1;37mPengorbanan yang akan selalu menghantui kami. \033[0m"
    sleep 3

    echo -e "\n\033[1;34m   Official Military Records: “A necessary war, for the future of Amestris.” \033[0m"
    sleep 5
    
    # Sensor dari pemerintah
    clear
    echo -e "\033[1;31mUnauthorized Disclosure Detected. \033[0m"
    sleep 2
    echo -e "\033[1;37mYou have accessed classified military records without authorization. \033[0m"
    sleep 3
    echo -e "\033[1;37mYour activity has been logged. \033[0m"
    sleep 3
    echo -e "\033[1;31mSecurity Protocol 56-A Initiated. Terminating session... \033[0m"
    sleep 3
    clear
    exit 1
else
    echo -e "\033[1;31mInvalid input. History remains unchanged. \033[0m"
    exit 1
fi